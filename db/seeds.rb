unless User.exists?(email: 'usuario@gmail.com')
  User.create!(
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'senha123',
    password_confirmation: 'senha123',
    first_login: true
  )


end


unless User.exists?(email: 'novo_usuario@gmail.com')
  User.create!(
    name: 'Rafael Azevedo',
    email: 'Rafaelprime94@gmail.com',
    password: 'rafael123',
    password_confirmation: 'rafael123',
    first_login: true
  )
end
