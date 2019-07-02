class ProjectController{
    constructor(){}

    createProjectTables(projects){
        var table = $(".container");
        table.empty();
            
        var columns = "";

        for(var i=0; i <= projects.length; i++){
            if(this.isThirdColumn(i) || this.isLastColumn(i, projects)){
                table.append("<div class=\"row\">"+columns+"</div>");
                columns = "";            
            }

            if(!this.isLastColumn(i, projects)){
                columns += this.createCard(projects[i]);
                            
            } 
        }
    }

    loadProjects(){
        var self = this;

        jQuery.get( "http://solidarizr-manager.herokuapp.com/events", function( data ) {
            console.log(data);
            self.createProjectTables(data);
        });
    }

    createCard(project){
        var description = project.description;;

        if(project.description.length > 200){
            description = project.description.substring(0, 196) + "...";
        }
        
        return  "<div class=\"col-sm\">"
                    +"<div class=\"card border-secondary mb-3\" style=\"max-width: 20rem;\">"
                    +"    <div class=\"card-header\"><a href=\"javascript:projectController.abrirModal("+project.id+")\">"+project.name+"</a></div>"
                    +"    <div class=\"card-body\">"
                    +"        <p class=\"card-text\">"+description+"</p>"
                    +"        <p><b>Telefone: " +project.phone+"</b></p>"
                    +"        <p><b>Site: "+project.site+"</b></p>"
                    +"    </div>"
                    +"    <div class=\"card-footer\"><a href=\"javascript:projectController.deleteProject("+project.id+")\">Apagar</a></div>"
                    +"</div>"
                +"</div>";   
    }

    async abrirModal(id){
        var self = this;
        this.fillCategories();
        this.fillTargetAudiences();
    
        if(id != null){
            await jQuery.get( "http://solidarizr-manager.herokuapp.com/event/"+id, function( data ) {
                self.fillForm(data);
            });
        }

        $('#modalForm').modal('show');

    }

    fillForm(event){
        $("#hdId").val(event.id);
        $("#name").val(event.name);
        $("#description").val(event.description);
        $("#site").val(event.site);
        $("#mail").val(event.mail);
        $("#phone").val(event.phone);
        $("#category").val(event.category.id);
        $("#targetAudience").val(event.targetAudience.id);
    }

    fillTargetAudiences(){
        var self = this;
        jQuery.get( "http://solidarizr-manager.herokuapp.com/targetAudiences/", function( data ) {
            self.createTArgetAudienceOptions(data);
        });
    }

    fillCategories(){
        var self = this;
        jQuery.get( "http://solidarizr-manager.herokuapp.com/categories/", function( data ) {
            self.createCategoryOptions(data);
        });
    }

    createTArgetAudienceOptions(data){
        var $targetAudiences = $("#targetAudience");

        $targetAudiences.empty();
        $.each(data, function(index, item) {
            $targetAudiences.append($("<option />").val(item.id).text(item.name));
        })
    }

    createCategoryOptions(data){
        var $categories = $("#category");

        $categories.empty();
        $.each(data, function(index, item) {
            $categories.append($("<option />").val(item.id).text(item.name));
        })
    }

    clearModal(){
        $("#hdId").val("");
        $("#name").val("");
        $("#description").val("");
        $("#site").val("");
        $("#mail").val("");
        $("#phone").val("");
        $("#category").val("");
        $("#targetAudience").val("");
    }

    saveEvent(){
        var self = this;

        var project = new Projeto();

        project.id = $("#hdId").val();
        project.name = $("#name").val();
        project.description = $("#description").val();
        project.site = $("#site").val();
        project.mail = $("#mail").val();
        project.phone = $("#phone").val();
        project.category.id = $("#category").val();
        project.targetAudience.id = $("#targetAudience").val();

        jQuery.ajax({
            type: 'POST',
            url : "http://solidarizr-manager.herokuapp.com/event",
            data: JSON.stringify(project),
            contentType: 'application/json',
            success: () => {alert("Salvo!"); $('#modalForm').modal('hide'); projectController.loadProjects();},
            error: (a,b) => {alert("Errou! "); console.log(a); console.log(b);} 
        })

        console.log(project);
    }

    deleteProject(id){
        var self = this;

        jQuery.ajax({
            type: 'DELETE',
            url : "http://solidarizr-manager.herokuapp.com/event/"+id,
            success: () => {alert("Deletado!"); projectController.loadProjects();},
            error: (a,b) => {alert("Errou! "); console.log(a); console.log(b);} 
        })
    }

    isThirdColumn(i){
        return (i > 0 && (i+1)%3 == 1);
    }

    isLastColumn(i, projects){
        return i == projects.length;
    }
}