class UsersController < ApplicationController

  def index
    
    @users = User.where('name LIKE(?) and id != ?', "#{params[:user]}%", current_user)
    # .where.not(group_users_params)
    # binding.pry
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  # def group_users_params
  #   params.require(:groups).permit(:group_id, :user_id)
  # end

end
