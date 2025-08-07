export const allAccess = (req, res) => {
    res.status(200).send("Página pública.");
};
 
export const userBoard = (req, res) => {
    res.status(200).send("Página que o usário comum pode acessar.");
};
 
export const adminBoard = (req, res) => {
    res.status(200).send("Página que o usuário administrador pode acessar.");
};
 
export const moderatorBoard = (req, res) => {
    res.status(200).send("Página que o usuário moderador pode acessar.");
};