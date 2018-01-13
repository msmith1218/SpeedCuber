using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Security.Policy;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using speedCuber.Models;
using speedCuber.Controllers;

namespace speedCuber.Controllers
{

    [RequireHttps]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "swag";

            return View();
        }

        public ActionResult TimeConfig()
        {
            ViewBag.Message = "Time Configuration";

            return View();
        }


        public String GetScramble()
        {
            ScramblerController contr = new ScramblerController();
            string finalScramble = contr.GetScrambleString();

            return finalScramble;
        }

        [Authorize]
        public void SaveScrambleTime(double scrambleTime, string scrambleType)
        {
            

            using (var context = new ApplicationDbContext())
            {
                var cubeTime = new CubeTime(1, User.Identity.GetUserId(), scrambleTime, scrambleType);
                context.CubeTimes.Add(cubeTime);
                try
                {
                    context.SaveChanges();
                }
                catch (Exception)
                {
                    //pass
                }
                
            }
        }

        [Authorize]
        public void SaveCubeType(string type)
        {
            using (var context = new ApplicationDbContext())
            {
                var cubeType = new CubeType(1, User.Identity.GetUserId(), type);
                context.CubeTypes.Add(cubeType);
                try
                {
                    context.SaveChanges();
                }
                catch (Exception)
                {
                    //pass
                }
            }
        }

        [Authorize]
        public JsonResult GetCubeTimes(string theType)
        {
            var cubeType = theType;
            var userId = User.Identity.GetUserId();
            using (var context = new ApplicationDbContext())
            {
                var times = context.CubeTimes.Where(c => c.UserId == userId && c.Type == cubeType).ToList();

                return Json(times);
            }
        }

        [Authorize]
        public JsonResult GetCubeTimesAll()
        {
            var userId = User.Identity.GetUserId();
            using (var context = new ApplicationDbContext())
            {
                var times = context.CubeTimes.Where(c => c.UserId == userId).ToList();

                return Json(times);
            }
        }

        [Authorize]
        public int DeleteCubeTime(int id)
        {
            var userId = User.Identity.GetUserId();
            using (var context = new ApplicationDbContext())
            {
                var cubeTime = context.CubeTimes.FirstOrDefault(x => x.UserId == userId && x.Id == id);
                if (cubeTime != null)
                {
                    context.CubeTimes.Remove(cubeTime);
                    try
                    {
                        context.SaveChanges();
                    }
                    catch (Exception)
                    {
                        //pass
                    }

                }
            }

            return id;
        }

        [Authorize]
        public JsonResult GetCubeTypes()
        {
            var userId = User.Identity.GetUserId();
            using (var context = new ApplicationDbContext())
            {
                var types = context.CubeTypes.Where(c => c.UserId == userId).ToList();
                return Json(types);
            }
        }

        [Authorize]
        public void DeleteCubeType(string type)
        {
            var userId = User.Identity.GetUserId();

            using (var context = new ApplicationDbContext())
            {
                var cubeType = context.CubeTypes.FirstOrDefault(x => x.UserId == userId && x.Type == type);
                if (cubeType != null)
                {
                    context.CubeTypes.Remove(cubeType);
                    try
                    {
                        context.SaveChanges();
                    }
                    catch(Exception)
                    {
                        //pass
                    }
                    
                }
            }
        }

        [Authorize]
        public void DeleteAllTimesWithAssocType(string theType)
        {
            var userId = User.Identity.GetUserId();

            using (var context = new ApplicationDbContext())
            {
                var cubeTimes = context.CubeTimes.Where(C => C.UserId == userId && C.Type == theType);
                foreach (CubeTime time in cubeTimes)
                {
                    context.CubeTimes.Remove(time);
                }
                context.SaveChanges();
            }
        }
    }
}