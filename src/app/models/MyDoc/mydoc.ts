export class MyDoc{

    name: string;
    doctype: string;
    fact_date: string;
    fact_number: number;
    provider: string;
    deposit_date: string;
    url: string;
    tva: number;
    ttc: number;

    constructor(
        name: string,
        doctype: string,
        fact_date: string,
        fact_number: number,
        provider: string,
        deposit_date: string,
        url: string,
        tva: number,
        ttc: number){
            this.name=name;
            this.doctype=doctype;
            this.fact_date=fact_date;
            this.fact_number=fact_number;
            this.provider=provider;
            this.deposit_date=deposit_date;
            this.url=url;
            this.tva=tva;
            this.ttc=ttc;
        }

}