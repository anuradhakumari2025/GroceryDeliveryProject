import request from "supertest";
import app from "../testApp.js";

describe("GET Product", () => {
  test("Should return @product-detail of given ID successfully", async () => {
    const id = "67fbe18946d6cb9038a341be";

    const response = await request(app).get(`/api/product/${id}`);
    console.log(response.statusCode, response.statusMessage, "response");
    console.log(response?.text, "response text");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  }, 15000);

  test("Should return @product-list successfully", async () => {
    const response = await request(app).get(`/api/product/list`);
    console.log(response.statusCode, response.statusMessage, "response");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  }, 15000);

  
});
