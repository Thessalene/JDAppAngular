enum EDocumentType {
    Facture,
    Devis,
    Bon_commande,
    Bon_livraison,
    Bulletin,
    RIB,
    Autres
}

export function getDocumentType(docType: string): EDocumentType {
    if (docType === 'Factures') {
        return EDocumentType.Facture;
    } else if (docType === 'Devis') {
        return EDocumentType.Devis;
    } else if (docType === 'Bon_commande') {
        return EDocumentType.Bon_commande;
    } else if (docType === 'Factures') {
        return EDocumentType.Bon_livraison;
    } else if (docType === 'Bulletin') {
        return EDocumentType.Bulletin;
    } else if (docType === 'RIB') {
        return EDocumentType.RIB;
    } else if (docType === 'Autres') {
        return EDocumentType.Autres;
    }
 }

 export function getPath(docType: EDocumentType): string {
    if(docType == EDocumentType.Facture){
        return "factures/"
    } else if (docType == EDocumentType.Devis) {
        return "devis/";
    } else if (docType == EDocumentType.Bon_commande) {
        return "bon_commande/";
    } else if (docType == EDocumentType.Bon_livraison) {
        return "bon_livraison/";
    } else if (docType == EDocumentType.Bulletin) {
        return "bulletins/";
    } else if (docType == EDocumentType.RIB) {
        return "rib/"; 
    } else if (docType == EDocumentType.Autres) {
        return "autres/";
    }
 }

