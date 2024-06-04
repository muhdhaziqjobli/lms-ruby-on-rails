class ChangeStatusDefaultInComments < ActiveRecord::Migration[7.1]
  def change
    change_column_default :comments, :status, 'public'
  end
end
