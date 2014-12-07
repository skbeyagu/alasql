if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 154 - InsexedDB test', function() {

	it("1. Create Database and Table", function(done){
		alasql('DROP IndexedDB DATABASE IF EXISTS ag154', [], function(res){
			assert(res == 1 || res == 0);
			alasql('CREATE IndexedDB DATABASE ag154', [], function(res){
				assert(res == 1);
				alasql('SHOW IndexedDB DATABASES', [], function(res) {
					var found = false;
					res.forEach(function(d){
						found = found || d.databaseid == 'ag154';
					});
					assert(found);
					alasql('ATTACH IndexedDB DATABASE ag154', [], function(res){
						assert(res == 1);
						alasql('CREATE TABLE ag154.one', [], function(res){
							assert(res == 1);
							alasql('SHOW TABLES FROM ag154', [], function(res){
								assert(res.length == 1);
								assert(res[0].tableid == 'one');
									// console.log(997,res);

								alasql('DROP TABLE ag154.one', [], function(res){
									// console.log(998,res);
									assert(res == 1);
									alasql('SHOW TABLES FROM ag154', [], function(res){
										// console.log(999,res);
										assert(res.length == 0);
										// console.log(alasql.databases.ag154);
										alasql('DETACH DATABASE ag154;DROP IndexedDB DATABASE ag154',[],function(res){
											assert(res[0]==1);
											assert(res[1]==1);
//											console.log(res);
											done();
										});

									});
								});
							});
						});
					});
				});
			});
		});
	});

if(false) {
	it("2. Show Databases Async", function(done){
		alasql('SHOW IndexedDB DATABASES', [], function(res){
			// console.log(100,res);
			done();
		});
	});

	it("3. Show Databases Like Async", function(done){
		alasql('SHOW IndexedDB DATABASES LIKE "my%"', [], function(res){
			// console.log(200, res);
		});
		done();
	});

	it("4. Drop Database", function(done){
		// console.log(alasql.databases.ag154);
		alasql('DROP IndexedDB DATABASE IF EXISTS ag154', [], function(res){
			assert(res == 1);
//			console.log(alasql.databases);
			alasql('DROP DATABASE IF EXISTS ag154', [], function(res){
				assert(res == 1 || res == 0);
				alasql('SHOW IndexedDB DATABASES', [], function(res){
					// console.log(300,res);
					done();
				});
			});
		});
	});

	it("5. Multiple lines async", function(done){
		alasql('CREATE IndexedDB DATABASE ag154a;SHOW IndexedDB DATABASES;DROP IndexedDB DATABASE ag154a', [], function(res){
			assert(res[0] == 1);
			var found = false;
			res[1].forEach(function(d){
				found = found || d.databaseid == 'ag154a';
			});
			assert(found);
			assert(res[2] == 1);
//		 	console.log(900, res);
			done();
		});
	});

	it("6. Multiple lines async", function(done){
		alasql('DROP IndexedDB DATABASE IF EXISTS ag154b;'+
			'CREATE IndexedDB DATABASE ag154b;'+
			'ATTACH IndexedDB DATABASE ag154b AS test154b;'+
			'CREATE TABLE test154b.one;'+
			'INSERT INTO test154b.one VALUES @{a:10};'+
			'', [], function(res){
		 	console.log(950, res);
			done();
		});
	});

};

});

}
