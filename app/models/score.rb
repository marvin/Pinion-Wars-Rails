class Score
  include Mongoid::Document
  field :name, :type => String
  field :score, :type => Integer
end
