/*!
 * Custom scripts
 */
(function() {
    //===== Input mask telephone =====//
    const inputTel = document.querySelector('.input-tel');

    if ( inputTel ) {
        Inputmask({'mask': '+7 (999) 999-9999'}).mask(inputTel);
    }

    //===== Dropdawn select =====//
    const inputSelectEl = document.querySelector('.input-select');

    if ( inputSelectEl ) {
        new Choices(inputSelectEl, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false
        });
    }

    //===== Site Vue =====//
    Vue.config.devtools = true;

    const APP_LOG_LIFECYCLE_EVENTS = false;

    let dataSite = {
        phoneDevice: ( window.innerWidth < 768 ) ? true : false,
        tabletDevice: ( window.innerWidth < 1024  ) ? true : false,
        mobileMenu: false
    }

    let site = new Vue({
        el: '#site',
        data: dataSite,
        methods: {
            watchSiteSize: function() {
                if ( window.innerWidth < 768 ) {
                    this.phoneDevice = true;
                } else {
                    this.phoneDevice = false;
                    this.mobileMenu = false;
                }

                this.tabletDevice = ( window.innerWidth < 1024  ) ? true : false;
            },
            toggleMobileMenu: function(e) {
                e.preventDefault();
                this.mobileMenu = this.mobileMenu ? false : true;
            }
        },
        beforeCreate: function() {

            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('beforeCreate');
        },
        created: function() {
            window.addEventListener('resize', this.watchSiteSize);

            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('created');
        },
        beforeMount: function() {
            
            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('beforeMount');
        },
        mounted: function() {
            
            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('mounted');
        },
        beforeUpdate: function() {
            
            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('beforeUpdate');
        },
        updated: function() {
           
            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('updated');
        },
        beforeDestroy: function() {
            
            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('beforeDestroy');
        },
        destroyed: function() {
            window.removeEventListener('resize', this.watchSiteSize);

            //For debugging
            if (APP_LOG_LIFECYCLE_EVENTS)
                console.log('destroyed');
        }
    });
}())
