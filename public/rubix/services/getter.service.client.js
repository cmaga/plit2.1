(function () {
  angular
    .module('Chrubix')
    .service('getterService', getterService);

  function getterService($http) {

    var api = {
      findPO: findPO,
      findREQ: findREQ,
      getCollections: getCollections,
      findItem: findItem,
      findReqsByBuyerDate: findReqsByBuyerDate, 
      findLU: findLU
    };
    return api;

    function findLU(dbname) {
      var url = "/api/lu/" + dbname;
      return $http.get(url)
        .then(function(response) {
          return response.data;
        }, function (err) {
          return err
        });
      
    }


    function findPO(poNumber) {
      var url = "/api/po/" + poNumber;
      console.log(url);
      return $http.get(url)
        .then(function (response) {
          return response.data;
        }, function (err) {
          return err;
        });
    }
    function getCollections(){
      var url = "/api/collection-list";
      return $http.get(url)
        .then(function(response){
          return response.data;
        }, function(err){
          return err;
        })
    }

    function findREQ(reqNumber) {
      var url = "/api/req/" + reqNumber;
      //console.log(url);
      return $http.get(url)
        .then(function (response) {
          return response.data;
        }, function (err) {
          return err;
        });
    }


    function findItem(itemNumber) {
      var url = "/api/item/" + itemNumber;
      console.log(url);
      return $http.get(url)
        .then(function (response) {
          return response.data;
        }, function (err) {
          return err;
        });
    }

    function findReqsByBuyerDate(buyer, date) {
      var url = ""
      if (buyer == "*INV" || buyer == "*") {
        url = "/api/req/date/" + date;
      } else {
        url = "/api/req/buyer/" + buyer + "/" + date;
      }
      console.log(url);
      return $http.get(url)
        .then(function (response) {
          return response.data;
        }, function (err) {
          return err;
        });
    }

  }
})();
