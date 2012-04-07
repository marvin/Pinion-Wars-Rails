class ScoreController < ApplicationController
  def index
  	# get the the top10 score
  end

  def create
  	@score = Score.new(params[:score])
  	if @score.save
  		# do something
  	else
  		# do something else
    end
  end
end
