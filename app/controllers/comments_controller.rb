class CommentsController < ApplicationController
	def new
		@article = Article.find(params[:article_id])
	end
	
	def create
		@article = Article.find(params[:article_id])
		@comment = @article.comments.create(comment_params)
		redirect_to articles_path
	end

	def destroy
		@article = Article.find(params[:article_id])
		@comment = @article.comments.find(params[:id])
		@comment.destroy
		redirect_to articles_path, status: :see_other
	end

	private
		def comment_params
			params.require(:comment).permit(:commenter, :body, :status)
		end
end
