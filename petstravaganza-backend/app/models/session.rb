class Session < ApplicationRecord

  team = {
    peyton: 'pete',
    pete: 'peyton'
  }

  def session_animals
    # randomly generate three animal instances
  end

  def session_tasks
    # randomly generate 15 tasks and assign them randomly to session animals
  end


end
