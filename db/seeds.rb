unless User.exists?(email: 'usuario@gmail.com')
  User.create!(
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'senha123',
    password_confirmation: 'senha123',
    first_login: true
  )
end
