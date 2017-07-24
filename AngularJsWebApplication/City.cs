using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJsWebApplication
{
    public class City
    {
        public City(int id, string name, int countryId)
        {
            this.Id = id;
            this.Name = name;
            this.CountryId = countryId;
        }
        public int Id { set; get; }
        public string Name { set; get; }
        public int CountryId { set; get; }
    }
}