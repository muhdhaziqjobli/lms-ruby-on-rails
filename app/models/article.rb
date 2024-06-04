class Article < ApplicationRecord
	include Visible

	has_many :comments, dependent: :destroy
	
	validates :title, presence: true
	validates :body, presence: true, length: { minimum: 10 }

	def public_comment_count
		comments.public_count
	end
end
