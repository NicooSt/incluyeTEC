const indexController = {
    home: (req, res) => {
        res.render('index', { title: 'Index' });
    },

    aboutUs: (req, res) => {
        res.render('aboutUs', { title: 'Sobre nosotros', style: 'aboutUs' });
    },

    contact: (req, res) => {
        let alert = '';

        if (req.query.alert) {
            alert = 'Lamentablemente eso no va a funcionar. Lola!';
        }

        res.render('contact', { title: 'Contacto', style: 'contact', alert });
    }
}

module.exports = indexController;