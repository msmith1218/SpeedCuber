using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Microsoft.ApplicationInsights.Web;

namespace speedCuber.Models
{
    public class CubeTime
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }

        public double Time { get; set; }

        public string Type { get; set; }

        public CubeTime(int cubeId, string userId, double theTime, string type)
        {
            Id = cubeId;
            UserId = userId;
            Time = theTime;
            Type = type;
        }

        public CubeTime()
        {
            
        }
        
    }

    public class CubeType
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }

        public string Type { get; set; }

        public CubeType(int typeId, string userId, string cubeType)
        {
            Id = typeId;
            UserId = userId;
            Type = cubeType;
        }
        
        public CubeType()
        {
            
        }
    }
}