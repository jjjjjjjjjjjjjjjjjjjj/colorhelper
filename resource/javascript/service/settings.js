angular
    .module( 'colorhelper' )
    .service( 'settings', settings );

settings.$inject = [ '$rootScope', 'localStorageService' ];

function settings( $rootScope, localStorageService ) {

    var service = {

        initSettings: initSettings,
        saveSettings: saveSettings,
        togglePalettePreference: togglePalettePreference,

        palettePreference: 'popular'

    };

    return service;
    ///////////////

    function initSettings() {

        service = localStorageService.get( 'settings' ) === null ? service : localStorageService.get( 'settings' );
        return saveSettings();

    }

    function saveSettings() {

        return localStorageService.set( 'settings', service );

    }

    function togglePalettePreference() {

        service.palettePreference = 'random' ? 'popular' : 'random';
        return saveSettings();

    }

}
