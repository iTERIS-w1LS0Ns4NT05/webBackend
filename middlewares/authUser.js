const checkUserRole = (req, res, next) => {
    // Verifique a role do usuário (supondo que a role esteja armazenada na propriedade 'role' do objeto 'user' na requisição)
    const { role } = req.user;
  
    // Verifique se a role permite adicionar uma nova carta ou um novo usuário
    if (role === 'admin') {
      // Role de administrador - permitir a operação
      next();
    } else {
      // Role de usuário normal - proibir a operação
      return res.status(403).json({ message: 'Esta operacao requer um nivel maior de acesso' });
    }
  };
  
  module.exports = { checkUserRole };
  