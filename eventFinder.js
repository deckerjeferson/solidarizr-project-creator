$(document).ready(function(){
    projects = [
        {
            name: "teste",
            description: "descrição",
            phone: "3535 3535",
            site: "www.google.com.br"
        },
        {
            name: "teste2",
            description: "descrição2",
            phone: "3535 3535",
            site: "www.google.com.br"
        },
        {
            name: "teste3",
            description: "descrição3",
            phone: "3535 3535",
            site: "www.google.com.br"
        }, 
        {
            name: "teste4",
            description: "descrição4",
            phone: "3535 3535",
            site: "www.google.com.br"
        }, 
        {
            name: "teste4",
            description: "descrição4",
            phone: "3535 3535",
            site: "www.google.com.br"
        }, 
        {
            name: "teste4",
            description: "descrição4",
            phone: "3535 3535",
            site: "www.google.com.br"
        }
    ];

    createProjectTables(projects);
});

function createProjectTables(projects){
    var table = $(".container");
        
    var columns = "";

    for(var i=0; i <= projects.length; i++){
        if(isThirdColumn(i) || isLastColumn(i)){
            table.append("<div class=\"row\">"+columns+"<div/>");
            columns = "";            
        }

        if(!isLastColumn(i)){
            columns += createCard(projects[i]);
                        
        } 
    }
}

function isThirdColumn(i){
    return (i > 0 && (i+1)%3 == 1);
}

function isLastColumn(i){
    return i == projects.length;
}

function createCard(project){
    return  "<div class=\"col-sm\">"
                +"<div class=\"card border-secondary mb-3\" style=\"max-width: 20rem;\">"
                +"    <div class=\"card-header\"><a href=\"javascript:abrirModal()\">"+project.name+"</a></div>"
                +"    <div class=\"card-body\">"
                +"        <p class=\"card-text\">"+project.description+"</p>"
                +"        <p><b>Telefone: " +project.phone+"</p>"
                +"        <p><b>Site: "+project.site+"</p>"
                +"    </div>"
                +"</div>"
            +"</div>";   
}

function abrirModal(){
    console.log("ouch!");
    $('#modalForm').modal('show');
}
