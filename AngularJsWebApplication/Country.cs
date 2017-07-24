using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJsWebApplication
{
    public class Country
    {
        public Country(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
        public int Id { set; get; }
        public string Name { set; get; }
        public List<City> Cities { set; get; }
    }
}