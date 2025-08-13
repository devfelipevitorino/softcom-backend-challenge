export const validaEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);    
} 

export const validaCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    return true;
}