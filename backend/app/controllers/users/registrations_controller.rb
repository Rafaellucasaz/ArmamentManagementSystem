module Users
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
   
  def update
     
      if resource.errors.empty?
        resource.update_column(:first_login, false)
      end
    end
   

  end
end
