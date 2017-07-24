using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJsWebApplication
{
    public class Student
    {
        public Student(int id, string name, string gender, string city)
        {
            this.id = id;
            this.name = name;
            this.gender = gender;
            this.city = city;
        }
        public Student() { }

        public int id { get; set; }

        public string name { get; set; }
        public string gender { get; set; }

        public string city { get; set; }
    }
}