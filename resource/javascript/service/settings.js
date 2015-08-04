angular
    .module( 'colorhelper' )
    .service( 'settings', settings );

settings.$inject = [ '$rootScope', 'localStorageService' ];

function settings( $rootScope, localStorageService ) {

    var service = {

        settings: {

            palettePreference: 'popular'

        },

        initSettings: initSettings,
        saveSettings: saveSettings,
        togglePalettePreference: togglePalettePreference,

    };

    return service;
    ///////////////

    function initSettings() {

        service.settings = localStorageService.get( 'settings' ) === null ? service.settings : localStorageService.get( 'settings' );
        return saveSettings();

    }

    function saveSettings() {

        return localStorageService.set( 'settings', service.settings );

    }

    function togglePalettePreference() {

        service.settings.palettePreference = ( service.settings.palettePreference === 'random' ) ? 'popular' : 'random';
        return saveSettings();

    }

}
