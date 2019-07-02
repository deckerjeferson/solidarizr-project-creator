var projectController = new ProjectController();

jQuery(window).ready(function(){
    $('#modalForm').on('hide.bs.modal', function() { projectController.clearModal() });
    
    $('#btnSave').click(projectController.saveEvent);
    
    projectController.loadProjects();    
});