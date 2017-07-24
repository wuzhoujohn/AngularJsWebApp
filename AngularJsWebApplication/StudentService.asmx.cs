using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Diagnostics;

namespace AngularJsWebApplication
{
    /// <summary>
    /// Summary description for StudentService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class StudentService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetAllStudents()
        {
            List<Student> listStudents = new List<Student>();
            for (int i = 0; i < 20; i++)
            {
                Student student = new Student(i + 1, $"Julian Wo{i}", "Male", "Toronto");
                if (i % 3 == 1)
                {
                    student.city = "Vancouver";
                }
                if (i % 2 == 0)
                {
                    student.name = $"Alice B{i}";
                }
                if (i % 5 == 2)
                {
                    student.city = "New York";
                }
                if(i % 3 == 2)
                {
                    student.name = $"Catherine C{i}u";
                }
                listStudents.Add(student);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listStudents));

        }

        [WebMethod]
        public void GetStudent(int id)
        {
            List<Student> listStudents = new List<Student>();
            Student result = new Student();
            for (int i = 0; i < 20; i++)
            {
                Student student = new Student(i + 1, $"Julian Wo{i}", "Male", "Toronto");
                if (i % 3 == 1)
                {
                    student.city = "Vancouver";
                }
                if (i % 2 == 0)
                {
                    student.name = $"Alice B{i}";
                }
                if (i % 5 == 2)
                {
                    student.city = "New York";
                }
                if (i % 3 == 2)
                {
                    student.name = $"Catherine C{i}u";
                }
                if(i == id - 1)
                {
                    result = student;
                }
                listStudents.Add(student);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(result));

        }

        [WebMethod]
        public void GetStudentByName(string name)
        {
            List<Student> listStudents = new List<Student>();
            List<Student> result = new List<Student>();
            for (int i = 0; i < 20; i++)
            {
                Student student = new Student(i + 1, $"Julian Wo{i}", "Male", "Toronto");
                if (i % 3 == 1)
                {
                    student.city = "Vancouver";
                }
                if (i % 2 == 0)
                {
                    student.name = $"Alice B{i}";
                }
                if (i % 5 == 2)
                {
                    student.city = "New York";
                }
                if (i % 3 == 2)
                {
                    student.name = $"Catherine C{i}u";
                }
                if (student.name.Contains(name))
                {
                    result.Add(student);
                }
                listStudents.Add(student);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(result));

        }
    }
}
