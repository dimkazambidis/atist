/*!
 * Custom scripts
 */
(function() {
    //===== Vue =====//
    // Vue.config.devtools = true;

    // const APP_LOG_LIFECYCLE_EVENTS = false;

    //===== Components (Start) =====//
    //_____ Select _____//
    // Vue.component('vue-multiselect', VueMultiselect.Multiselect);

    //_____ Slide toggle _____//
    // Vue.component('slide-up-down', VueSlideUpDown);

    //_____ Offer card _____//
    //===== Components (End) =====//

    //===== Filters =====//
    // Vue.filter('phoneCrop', function(value) {
    //     if (!value) return ''
    //     value = value.toString();
    //     return value.replace(/[^0-9\+]+/g, '')
    // });

    // Vue.filter('phoneLink', function(value) {
    //     if (!value) return ''
    //     value = value.toString();
    //     return 'tel:' + value.replace(/[^0-9\+]+/g, '')
    // });

    //===== Site data =====//
    //  let dataSite = {
    //     phoneDevice: ( window.innerWidth < 768 ) ? true : false,
    //     tabletDevice: ( window.innerWidth < 1024  ) ? true : false,
    //     mobileMenu: false,
    //     inputs: {
    //         filter: {
    //             value: ''
    //         },
    //         sort: {
    //             value: ''
    //         }
    //     }
    // }

    //===== Example Vue Site =====//
    // let site = new Vue({
    //     el: '#site',
    //     data: dataSite,
    //     methods: {
    //         watchSiteSize: function() {
    //             if ( window.innerWidth < 768 ) {
    //                 this.phoneDevice = true;
    //             } else {
    //                 this.phoneDevice = false;
    //                 this.mobileMenu = false;
    //             }

    //             this.tabletDevice = ( window.innerWidth < 1024  ) ? true : false;
    //         },
    //         toggleMobileMenu: function(e) {
    //             e.preventDefault();
    //             this.mobileMenu = this.mobileMenu ? false : true;
    //         },
    //         phoneToggle: function(e) {
    //             e.preventDefault();
    //             console.dir(e.target);
    //             e.target.innerText = '+7 (913) 060-88-33';

    //             return '+7 (913) 060-88-33';
    //         }
    //     },
    //     beforeCreate: function() {
    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('beforeCreate');
    //     },
    //     created: function() {
    //         window.addEventListener('resize', this.watchSiteSize);

    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('created');
    //     },
    //     beforeMount: function() {
    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('beforeMount');
    //     },
    //     mounted: function() {
    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('mounted');
    //     },
    //     beforeUpdate: function() {
    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('beforeUpdate');
    //     },
    //     updated: function() {
    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('updated');
    //     },
    //     beforeDestroy: function() {
    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('beforeDestroy');
    //     },
    //     destroyed: function() {
    //         window.removeEventListener('resize', this.watchSiteSize);

    //         //For debugging
    //         if (APP_LOG_LIFECYCLE_EVENTS)
    //             console.log('destroyed');
    //     }
    // });
}())
