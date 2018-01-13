using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace speedCuber.Models
{
    public class ScrambleSpecs
    {
        public int NumItems { get;}
        private readonly string[] _possibles = {"F", "U", "D", "B", "L", "R"};

        public ScrambleSpecs()
        {
            NumItems = 20;
        }

        public string[] GetPossibles()
        {
            return _possibles;
        }
    }
}