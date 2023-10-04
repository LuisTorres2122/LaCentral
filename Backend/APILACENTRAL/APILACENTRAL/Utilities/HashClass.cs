
using System.Security.Cryptography;
using System.Text;

namespace APILACENTRAL.Utilities
{
    public class HashClass
    {

        public  string SetHash(string inputString) 
        {
            string hash = "x2";
            byte[] bytes = UTF8Encoding.UTF8.GetBytes(inputString);
            MD5 mD5 = MD5.Create();
            TripleDES tripleDES = TripleDES.Create();
            tripleDES.Key = mD5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash)); 
            tripleDES.Mode = CipherMode.ECB; 
            ICryptoTransform transform = tripleDES.CreateEncryptor();
            byte[] output = transform.TransformFinalBlock(bytes, 0, bytes.Length); 
            return Convert.ToBase64String(output); 
        }

       
        public  string GetHash(string inputString)
        {
            string hash = "x2";
            byte[] bytes = Convert.FromBase64String(inputString); 
            MD5 mD5 = MD5.Create();
            TripleDES tripleDES = TripleDES.Create();
            tripleDES.Key = mD5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash)); 
            tripleDES.Mode = CipherMode.ECB; 
            ICryptoTransform transform = tripleDES.CreateDecryptor();  
            byte[] output = transform.TransformFinalBlock(bytes, 0, bytes.Length);
            return UTF8Encoding.UTF8.GetString(output);
        }


    }
}
