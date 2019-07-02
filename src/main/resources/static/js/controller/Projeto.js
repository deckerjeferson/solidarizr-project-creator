class Projeto {

    constructor(id, name, description, site, mail, phone, categoryId, targetAudienceId){
        this.id = id;
        this.name = name;
        this.description = description;
        this.site = site;
        this.mail = mail;
        this.phone = phone;
        this.category = {id: categoryId};
        this.targetAudience = {id: targetAudienceId};
    }
}