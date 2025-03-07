class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    flash.clear
    if resource.first_login?
      flash[:notice] = "Bem-vindo! Por favor, altere sua senha."
      edit_user_registration_path
    else
      movimentacaos_path
    end
  end
  def after_sign_out_path_for(resource)
    flash.clear
    root_path
  end
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
