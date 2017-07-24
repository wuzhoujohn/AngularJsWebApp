using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Data;
using System.Configuration;

namespace AngularJsWebApplication
{
    /// <summary>
    /// Summary description for LocationsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class LocationsService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetAllLocations()
        {
            //this is actually for retrieving locations from database.
            List<Country> listCountries = new List<Country>();
            List<City> listCitiesA = new List<City>();
            Country china = new Country(1, "China");
            City cityA = new City(101, "Beijing", 1);
            City cityB = new City(102, "Shanghai", 1);
            City cityC = new City(103, "Guangzhou", 1);
            listCitiesA.Add(cityA);
            listCitiesA.Add(cityB);
            listCitiesA.Add(cityC);
            china.Cities = listCitiesA;
            Country canada = new Country(2, "Canada");
            List<City> listCitiesB = new List<City>();
            City cityD = new City(201, "Toronto", 2);
            City cityE = new City(202, "Vancouver", 2);
            City cityF = new City(203, "Ottawa", 2);
            listCitiesB.Add(cityD);
            listCitiesB.Add(cityE);
            listCitiesB.Add(cityF);
            canada.Cities = listCitiesB;
            Country america = new Country(3, "USA");
            List<City> listCitiesC = new List<City>();
            City cityG = new City(301, "New York", 3);
            City cityH = new City(302, "Huston", 3);
            City cityI = new City(303, "Los Angeles", 3);
            listCitiesC.Add(cityG);
            listCitiesC.Add(cityH);
            listCitiesC.Add(cityI);
            america.Cities = listCitiesC;
            listCountries.Add(china);
            listCountries.Add(canada);
            listCountries.Add(america);
            System.Web.Script.Serialization.JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listCountries));
        }
    }
}
