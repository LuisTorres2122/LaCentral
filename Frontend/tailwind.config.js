/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'enmarcadora': {
          principal: '#107761',
          second: '#dff8f8',
          third: '#74d0c8',
          fourth: '#50a09a',
          'complementarios': {
            b: '#0DC49D',
            c: '#2DC4A4',
            d: '#C43300',
            e: '#782A10'
          }
        },
      },
      height: {
        'custom': '450px',
        'vlg': '600px',
        'maxHeader': '1080px',
        'A4': '788px',
        'A4-2': '608px'
      },
      width: {
        'custom': '450px',
        'vlg': '600px',
        '144p': '580px',
        'orderCard': '850px',
        'gallryW': '1000px',
        'A4':'608px',
        'A4-2':'788px',
        'A4-m2':'391px'
      },
      fontFamily: {
        dancing: ['Dancing Script'],
        playfair: ['Playfair Display']
      },
      borderWidth: {
        '1p': '1px',
      },
      

    },

  },
  plugins: [
    
  ],
}

