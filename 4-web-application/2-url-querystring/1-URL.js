const urlObj = new URL('http://localhost/info?name=jelly#pause');
const { searchParams } = urlObj;

console.log(Object.prototype.toString.call(urlObj), urlObj);

console.log(Object.prototype.toString.call(searchParams), searchParams);

searchParams.set("age", 18);
searchParams.append("gender", "male");
console.log(
  "searchParams-1: ",
  searchParams.get("name"),
  searchParams.get("age"),
  searchParams.get("gender")
  );
  searchParams.delete("name");
  console.log("searchParams-2: ", searchParams);

console.log(JSON.stringify(urlObj, null, "  "));
