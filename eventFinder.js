jQuery(document).ready(function(){
    
    $('#modalForm').on('hide.bs.modal', function (e) {
        clearModal();
    })

    $('#btnSave').click(saveEvent);

    loadProjects();
    
});

function createProjectTables(projects){
    var table = $(".container");
    table.empty();
        
    var columns = "";

    for(var i=0; i <= projects.length; i++){
        if(isThirdColumn(i) || isLastColumn(i, projects)){
            table.append("<div class=\"row\">"+columns+"<div/>");
            columns = "";            
        }

        if(!isLastColumn(i, projects)){
            columns += createCard(projects[i]);
                        
        } 
    }
}

function isThirdColumn(i){
    return (i > 0 && (i+1)%3 == 1);
}

function isLastColumn(i, projects){
    return i == projects.length;
}

function createCard(project){
    return  "<div class=\"col-sm\">"
                +"<div class=\"card border-secondary mb-3\" style=\"max-width: 20rem;\">"
                +"    <div class=\"card-header\"><a href=\"javascript:abrirModal("+project.id+")\">"+project.name+"</a></div>"
                +"    <div class=\"card-body\">"
                +"        <p class=\"card-text\">"+project.description+"</p>"
                +"        <p><b>Telefone: " +project.phone+"</p>"
                +"        <p><b>Site: "+project.site+"</p>"
                +"    </div>"
                +"    <div class=\"card-footer\"><a href=\"javascript:deleteProject("+project.id+")\">Apagar</a></div>"
                +"</div>"
            +"</div>";   
}

async function abrirModal(id){
    console.log("entrou:" +id);
  
    fillCategories();
    fillTargetAudiences();
  
    if(id != null){
        await jQuery.get( "http://solidarizr-manager.herokuapp.com/event/"+id, function( data ) {
            fillForm(data);
        });
    }

    $('#modalForm').modal('show');

}

function fillForm(event){
    $("#hdId").val(event.id);
    $("#name").val(event.name);
    $("#description").val(event.description);
    $("#site").val(event.site);
    $("#mail").val(event.mail);
    $("#phone").val(event.phone);
    $("#category").val(event.category.id);
    $("#targetAudience").val(event.targetAudience.id);
}

function fillTargetAudiences(){
    jQuery.get( "http://solidarizr-manager.herokuapp.com/targetAudiences/", function( data ) {
        createTArgetAudienceOptions(data);
     });
}

function fillCategories(){
    jQuery.get( "http://solidarizr-manager.herokuapp.com/categories/", function( data ) {
        createCategoryOptions(data);
     });
}

function createTArgetAudienceOptions(data){
    var $targetAudiences = $("#targetAudience");

    $targetAudiences.empty();
    $.each(data, function(index, item) {
        $targetAudiences.append($("<option />").val(item.id).text(item.name));
    })
}

function createCategoryOptions(data){
    var $categories = $("#category");

    $categories.empty();
    $.each(data, function(index, item) {
        $categories.append($("<option />").val(item.id).text(item.name));
    })
}

function clearModal(){
    $("#hdId").val("");
    $("#name").val("");
    $("#description").val("");
    $("#site").val("");
    $("#mail").val("");
    $("#phone").val("");
    $("#category").val("");
    $("#targetAudience").val("");
}

function saveEvent(){
    var project = {
        category : {},
        targetAudience: {}
    };

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
        url : "https://cors-anywhere.herokuapp.com/http://solidarizr-manager.herokuapp.com/event",
        data: JSON.stringify(project),
        contentType: 'application/json',
        success: () => {alert("Yes!"); $('#modalForm').modal('hide'); loadProjects();},
        error: (a,b) => {alert("Errou! "); console.log(a); console.log(b);} 
    })

    console.log(project);
}

function deleteProject(id){
    jQuery.ajax({
        type: 'DELETE',
        url : "https://cors-anywhere.herokuapp.com/http://solidarizr-manager.herokuapp.com/event/"+id,
        success: () => {alert("Deletado!"); loadProjects();},
        error: (a,b) => {alert("Errou! "); console.log(a); console.log(b);} 
    })
}

function loadProjects(){
    jQuery.get( "http://solidarizr-manager.herokuapp.com/events", function( data ) {
        console.log(data);
        createProjectTables(data);
    });
}