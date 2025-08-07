import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authConfig from "../config/auth.config.js";
import { Op } from "sequelize";
 
const { user: User, role: Role } = db;
 
export const signup = async (req, res) => {
    try {
        const { username, email, cnpj, password, roles } = req.body;
 
        const hashedPassword = await bcrypt.hash(password, 8);
 
        const userRole = await Role.findOne({ where: { name: "user" } });
 
        const user = await User.create({
            username,
            email,
            cnpj,
            password: hashedPassword,
        });
 
        await user.setRoles([userRole]);
 
        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
export const signin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || identifier.trim() === "") {
            return res.status(400).json({ message: "Email ou CNPJ não informado." });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({ message: "Senha não informada." });
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { cnpj: identifier },
                    { email: identifier }
                ]
            },
            include: { model: Role, as: "roles" },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Senha inválida!",
            });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400, 
        });

        const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            cnpj: user.cnpj,
            roles: authorities,
            accessToken: token,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
