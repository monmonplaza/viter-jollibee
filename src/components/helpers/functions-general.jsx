export const imgPath = "http://localhost/viter-jollibee/public/img";
export const baseUrl = "http://localhost/viter-jollibee";

export const devApiUrl = `${baseUrl}/rest`;
export const devBaseUrl = `${baseUrl}`;
export const devBaseImgUrl = `${imgPath}`;
export const devNavUrl = "";

export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

export const ver = "v1";

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
  const data = fetch(url, {
    method: "post",
    body: fd,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error + " api endpoint error");
    });

  return data;
};
