
this.jetpackModules = this.jetpackModules || {};

window.jetpackModules.models = (function( window, $, _, Backbone ) {
		'use strict';

		var models = {};

		models.Modules = Backbone.Model.extend({
			visibles : {},

			/**
			* Updates modules.items dataset to be a reflection of both the current
			* modules.raw data, as well as any filters or sorting that may be in effect.
			*/
			filter_and_sort : function() {
				var subsubsub = $('.subsubsub .current'),
					items     = this.get( 'raw' ),
					m_filter  = $('.button-group.filter-active .active'),
					m_sort    = $('.button-group.sort .active'),
					groups;

				// If a module filter has been selected, filter it!
				if ( ! subsubsub.closest('li').hasClass( 'all' ) ) {
					items = _.filter( items, function( item ) {
						return _.contains( item.module_tags, subsubsub.data( 'title' ) );
					} );
				}

				if ( m_filter.data('filter-by') ) {
					items = _.filter( items, function( item ) {
						return item[ m_filter.data('filter-by') ] == m_filter.data('filter-value');
					} );
				}

				if ( m_sort.data('sort-by') ) {
					items = _.sortBy( items, m_sort.data('sort-by') );
				}

				// Sort unavailable modules to the end if the user is running in local mode.
				groups = _.groupBy( items, 'available' );
				if ( _.has( groups, 'false' ) ) {
					items = [].concat( groups[true], groups[false] );
				}

				// Now shove it back in.
				this.set( 'items', items );

				return this;
			},

			initialize : function() {
				var items = this.get( 'items' );
				delete items.vaultpress;
				this.set( 'raw', items );
			}

		});

		return models;

})( this, jQuery, _, Backbone );
