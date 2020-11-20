export var UNDERSCORE = "_";
export var SEPARATOR= "/";

export var FACTURES_COLLECTION = "Factures_test";
export var BULLETIN_COLLECTION = "Bulletins";
export var BULLETIN_CODE = "BP";
export var FACTURES_CODE = "FACT";


export var MONTH_ARRAY = [
    "JAN","FEV", "MAR", "AVR", "MAI", "JUN", "JUI", "AOU", "SEP", "OCT", "NOV", "DEC"
]
export var dataTest = [
    {
      name: 'Factures',
      type: 'folder',
      children: [
        {
          name: 'FACT_2020',
          type: 'folder',
          children: [
            
          ]
        }
      ]
    },
    {
      name: 'Devis',
      type: 'folder',
      children: [
        {
          name: 'packages',
          type: 'folder',
          children: [
            { name: '.travis.yml', type: 'file' },
            { name: 'firebase.json', type: 'file' }
          ]
        },
        { name: 'package.json', type: 'file' }
      ]
    },
    {
      name: 'Bulletins',
      type: 'folder',
      children: [
        { name: 'gulpfile.js', type: 'file' },
        { name: 'README.md', type: 'file' }
      ]
    }
  ];
