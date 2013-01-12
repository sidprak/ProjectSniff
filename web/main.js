var getCurrentTime = function(){
	return new Date().getTime() - (3600000 * 5);
};

$(function(){
	var HOST = '192.168.2.1';
	var POLL_INTERVAL = 1500;
	var CURR_LOC = {
		lat: 43.471686,
		long: -80.545256
	};

	/**
	 * Gray theme for Highcharts JS
	 * @author Torstein Hønsi
	 */

	Highcharts.theme = {
	   colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
	      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	   chart: {
	      backgroundColor: {
	         linearGradient: [0, 0, 0, 400],
	         stops: [
	            [0, 'rgb(96, 96, 96)'],
	            [1, 'rgb(16, 16, 16)']
	         ]
	      },
	      borderWidth: 0,
	      borderRadius: 15,
	      plotBackgroundColor: null,
	      plotShadow: false,
	      plotBorderWidth: 0
	   },
	   title: {
	      style: {
	         color: '#FFF',
	         font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
	      }
	   },
	   subtitle: {
	      style: {
	         color: '#DDD',
	         font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
	      }
	   },
	   xAxis: {
	      gridLineWidth: 0,
	      lineColor: '#999',
	      tickColor: '#999',
	      labels: {
	         style: {
	            color: '#999',
	            fontWeight: 'bold'
	         }
	      },
	      title: {
	         style: {
	            color: '#AAA',
	            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
	         }
	      }
	   },
	   yAxis: {
	      alternateGridColor: null,
	      minorTickInterval: null,
	      gridLineColor: 'rgba(255, 255, 255, .1)',
	      lineWidth: 0,
	      tickWidth: 0,
	      labels: {
	         style: {
	            color: '#999',
	            fontWeight: 'bold'
	         }
	      },
	      title: {
	         style: {
	            color: '#AAA',
	            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
	         }
	      }
	   },
	   legend: {
	      itemStyle: {
	         color: '#CCC'
	      },
	      itemHoverStyle: {
	         color: '#FFF'
	      },
	      itemHiddenStyle: {
	         color: '#333'
	      }
	   },
	   labels: {
	      style: {
	         color: '#CCC'
	      }
	   },
	   tooltip: {
	      backgroundColor: {
	         linearGradient: [0, 0, 0, 50],
	         stops: [
	            [0, 'rgba(96, 96, 96, .8)'],
	            [1, 'rgba(16, 16, 16, .8)']
	         ]
	      },
	      borderWidth: 0,
	      style: {
	         color: '#FFF'
	      }
	   },


	   plotOptions: {
	      line: {
	         dataLabels: {
	            color: '#CCC'
	         },
	         marker: {
	            lineColor: '#333'
	         }
	      },
	      spline: {
	         marker: {
	            lineColor: '#333'
	         }
	      },
	      scatter: {
	         marker: {
	            lineColor: '#333'
	         }
	      },
	      candlestick: {
	         lineColor: 'white'
	      }
	   },

	   toolbar: {
	      itemStyle: {
	         color: '#CCC'
	      }
	   },

	   navigation: {
	      buttonOptions: {
	         backgroundColor: {
	            linearGradient: [0, 0, 0, 20],
	            stops: [
	               [0.4, '#606060'],
	               [0.6, '#333333']
	            ]
	         },
	         borderColor: '#000000',
	         symbolStroke: '#C0C0C0',
	         hoverSymbolStroke: '#FFFFFF'
	      }
	   },

	   exporting: {
	      buttons: {
	         exportButton: {
	            symbolFill: '#55BE3B'
	         },
	         printButton: {
	            symbolFill: '#7797BE'
	         }
	      }
	   },

	   // scroll charts
	   rangeSelector: {
	      buttonTheme: {
	         fill: {
	            linearGradient: [0, 0, 0, 20],
	            stops: [
	               [0.4, '#888'],
	               [0.6, '#555']
	            ]
	         },
	         stroke: '#000000',
	         style: {
	            color: '#CCC',
	            fontWeight: 'bold'
	         },
	         states: {
	            hover: {
	               fill: {
	                  linearGradient: [0, 0, 0, 20],
	                  stops: [
	                     [0.4, '#BBB'],
	                     [0.6, '#888']
	                  ]
	               },
	               stroke: '#000000',
	               style: {
	                  color: 'white'
	               }
	            },
	            select: {
	               fill: {
	                  linearGradient: [0, 0, 0, 20],
	                  stops: [
	                     [0.1, '#000'],
	                     [0.3, '#333']
	                  ]
	               },
	               stroke: '#000000',
	               style: {
	                  color: 'yellow'
	               }
	            }
	         }
	      },
	      inputStyle: {
	         backgroundColor: '#333',
	         color: 'silver'
	      },
	      labelStyle: {
	         color: 'silver'
	      }
	   },

	   navigator: {
	      handles: {
	         backgroundColor: '#666',
	         borderColor: '#AAA'
	      },
	      outlineColor: '#CCC',
	      maskFill: 'rgba(16, 16, 16, 0.5)',
	      series: {
	         color: '#7798BF',
	         lineColor: '#A6C7ED'
	      }
	   },

	   scrollbar: {
	      barBackgroundColor: {
	            linearGradient: [0, 0, 0, 20],
	            stops: [
	               [0.4, '#888'],
	               [0.6, '#555']
	            ]
	         },
	      barBorderColor: '#CCC',
	      buttonArrowColor: '#CCC',
	      buttonBackgroundColor: {
	            linearGradient: [0, 0, 0, 20],
	            stops: [
	               [0.4, '#888'],
	               [0.6, '#555']
	            ]
	         },
	      buttonBorderColor: '#CCC',
	      rifleColor: '#FFF',
	      trackBackgroundColor: {
	         linearGradient: [0, 0, 0, 10],
	         stops: [
	            [0, '#000'],
	            [1, '#333']
	         ]
	      },
	      trackBorderColor: '#666'
	   },

	   // special colors for some of the demo examples
	   legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
	   legendBackgroundColorSolid: 'rgb(70, 70, 70)',
	   dataLabelsColor: '#444',
	   textColor: '#E0E0E0',
	   maskColor: 'rgba(255,255,255,0.3)'
	};

	// Apply the theme
	var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

	// Basic Current Stats, eg. users and domains connected.
	var CurrentStatsModel = Backbone.Model.extend({
		
		defaults: {
			usersConnected: 0,
			domainsConnected: 0,
			geo: []
		},

		initialize: function(){

		},

		url: function(){
			return 'http://' + HOST + '/fbhack/current_stats.php';
		},

		parse: function(response){
			if (response){
				if (response.numUsers){
					this.set('usersConnected', parseInt(response.numUsers));
				}
				if (response.geoip && response.geoip !== []){
					this.set('domainsConnected', response.geoip.length);
					this.set('geo', response.geoip);
				}
			};
		}
	});

	var CurrentStats = new CurrentStatsModel();

	var CurrentStatsView = Backbone.View.extend({

		el: $('#current-stats'),

		model: CurrentStats,

		statsTemplate: _.template($('#stats-template').html()),

		initialize: function(){

		},

		render: function(){

			var data = {
				usersConnected: this.model.get('usersConnected'),
				domainsConnected: this.model.get('domainsConnected')
			};

			$(this.el).html(this.statsTemplate(data));
		}
	});

	var TopSitesModel = Backbone.Model.extend({
		defaults: {
			sites: [],
			delta: 24 * 60 * 60 * 1000,
			deltaName: '1day'
		},

		initialize: function(){

		},

		url: function(){
			var url = 'http://' + HOST + '/fbhack/get_top_domains.php';
			var param = '?timestamp=' + parseInt((new Date().getTime() - this.get('delta')) / 1000);
			return url + param;
		},

		parse: function(response){
			if (response){
				this.set('sites', response);	
			};
		},

		setDelta: function(delta){
			this.set('deltaName', delta);
			switch(delta){
				case 'current':
					this.set('delta', 1000);
					break;
				case '1min':
					this.set('delta', 60 * 1000);
					break;
				case '1hr':
					this.set('delta', 60 * 60 * 1000);
					break;
				case '1day':
					this.set('delta', 24 * 60 * 60 * 1000);
					break;
				case 'all':
					this.set('delta', 99999999999);
					break;
			}
		},
	});

	var TopSites = new TopSitesModel();

	var TopSitesView = Backbone.View.extend({
		el: $('#top-sites'),

		events: {
			'click .btn-group': 'clickBtnEvt'
		},

		model: TopSites,

		template: _.template($('#top-sites-template').html()),

		initialize: function(){
			this.render();
		},

		render: function(){
			var data = {
				sites: this.model.get('sites'),
				delta: this.model.get('deltaName')
			};

			$(this.el).html(this.template(data));
		},

		clickBtnEvt: function(evt){
			var delta = evt.target.dataset.delta;
			this.model.setDelta(delta);
			this.model.fetch();
			this.render();
		}
	});

	var CurrentStatsChartView = Backbone.View.extend({

		model: CurrentStats,

		MAX_DATA_POINTS: 50,
		
		chartEl: $('#current-stats-chart'),
		chart: null,

		initialize: function(){
			this.chart = new Highcharts.Chart({
				chart: {
					renderTo: 'current-stats-chart',
					type: 'spline'
				},
				title: {
					text: 'Current Network Status'
				},
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						second: '%H:%M:%S'
					},
					minTickInterval: 1000
				},
				yAxis: {
					title: {
						text: ''
					},
					min: 0,
					minRange: 1,
					minTickInterval: 1
				},
				series: [
					{
						name: 'Active Users',
						data: []
					},
					{
						name: 'Connected Websites',
						data: []
					}
				],
				credits: {
					enabled: false
				}
			});

			this.render();
		},

		render: function(){
			var stats = {
				usersConnected: this.model.get('usersConnected'),
				domainsConnected: this.model.get('domainsConnected')
			};

			var seriesUsers = this.chart.series[0];
			var seriesDomains = this.chart.series[1];

			var x = getCurrentTime();

			var shiftSeries = seriesUsers.data.length >= this.MAX_DATA_POINTS;

			seriesUsers.addPoint([x, stats.usersConnected], true, shiftSeries);
			seriesDomains.addPoint([x, stats.domainsConnected], true, shiftSeries);
		}
	});

	var MapView = Backbone.View.extend({
		model: CurrentStats,
		mapEl: $('#google-map'),

		currLoc: new google.maps.LatLng(CURR_LOC.lat, CURR_LOC.long),
		overlays: [],

		mapOptions: {
			center: new google.maps.LatLng(0, 0),
			zoom: 2,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},

		initialize: function(){
			this.map = new google.maps.Map(this.mapEl[0], this.mapOptions);
		},

		clearOverlays: function(){
			while(this.overlays[0])
			{
			  this.overlays.pop().setMap(null);
			}
		},

		render: function(){
			this.clearOverlays();

			var locations = this.model.get('geo');
			locations.forEach(function(location){

				if (location.latitude !== 999 && location.latitude !== '999'){
					var destLoc = new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude));
						var path = [this.currLoc, destLoc];

						var overlay = new google.maps.Polyline({
							path: path,
							strokeColor: '#000000',
							strokeOpacity: 0.5,
							strokeWeight: 4,
							clickable: false
						});
						overlay.setMap(this.map);

						this.overlays.push(overlay);
				}
			}.bind(this));
		}
	});

	var FacebookStatsModel = Backbone.Model.extend({
		defaults: {
			stats: []
		},

		initialize: function(){

		},

		url: function(){
			return 'http://' + HOST + '/fbhack/get_fb_traffic.php';
		},

		parse: function(response){
			if (response){
				this.set('stats', response);
			};
		}
	});

	var FacebookStats = new FacebookStatsModel();

	var FacebookView = Backbone.View.extend({
		model: FacebookStats,

		el: $('#facebook'),

		template: _.template($('#stats-facebook-template').html()),

		initialize: function(){
			this.render();
		},

		render: function(){
			var data = {
				stats: this.model.get('stats')
			};

			$(this.el).html(this.template(data));
		},
	});

	// Top Level UI.
	var AppView = Backbone.View.extend({

		el: $('#application'),

		currentStatsView: new CurrentStatsView(),
		currentStatsChartView: new CurrentStatsChartView(),
		topSitesView: new TopSitesView(),
		mapView: new MapView(),
		facebookView: new FacebookView(),

		initialize: function(){
			this.render();
			this.setPolling();
		},

		setPolling: function(){
			this.pollModelFetch = setInterval(function(){
				this.updateData();
			}.bind(this), POLL_INTERVAL);
		},

		render: function(){
			this.currentStatsView.render();
		},

		updateData: function(){
			CurrentStats.fetch();
			TopSites.fetch();
			FacebookStats.fetch();
			this.currentStatsView.render();
			this.currentStatsChartView.render();
			this.topSitesView.render();
			this.mapView.render();
			this.facebookView.render();
		}
	});

	// Start the app.
	var App = new AppView;
});