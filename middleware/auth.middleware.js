import jwt from 'jsonwebtoken';

export function autenticar(req, res, next){
    // Extrai o authorization do headers para dentro da variavel authHeader
    const authHeader = req.headers['authorization'];

    // Verificar se cabeçalho (headers) contem o Bearer
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({erro: "Token inválido"});
    }

    // Extrair token
    const token = authHeader.split(' ')[1];

    // Verificar se o token é valido
    try {
        const validarToekn = jwt.verify(token, process.env.JTW_SECRET); //Verificando se o token é valido
        req.usuario = validarToekn //disponibilizo os dados do token na requisição
        console.log("Conteúdo do req.usuario: ", req.usuario);
        
        next();
    } catch (error) {
        res.status(401).json({erro: "Token inválido"});
    }
}