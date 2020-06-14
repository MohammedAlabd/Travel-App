import "babel-polyfill";
import { handleSubmit } from "./handleSubmit";
import jsdom from "jsdom";
const JSDOM = jsdom.JSDOM;
const dom = new JSDOM(`
<form action="#" onsubmit="return Client.handleSubmit(event)">
<div class="row mb-2">
    <div class="col-12 text-center">
        <label for="city"> Which City Do You Want To Travel For?</label>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <select class="custom-select" id="countries-list">
                <option id="select" selected value="test County">Choose Country...</option>
            </select>
        </div>
        <input type="text" id="city-input" name="city" class="form-control"
            aria-label="Text input with dropdown button" value="city test" required>
    </div>
</div>
<div class="row mb-2">
    <div class="col-12 text-center">
        <label for="date"> Please Choose Your Travel Date</label>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Travel Date</span>
            </div>
            <input type="date" id="date-input" name="date" class="form-control" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" value="test Date" required>
        </div>
    </div>
</div>
<div class="col-12 text-center">
    <input type="submit" value="Get The Data" class="btn btn-outline-primary btn-block btn-large">
</div>
</form>
`);
const unMockedFetch = global.fetch;

beforeAll(() => {
  global.document = dom.window.document;

  global.fetch = () =>
    Promise.resolve({
      json: () => ({
        test: "test string",
        state: "pass"
      }),
    });
  global.Client = {
    renderTravelCard: () => null,
  };
});

afterAll(() => {
  global.fetch = unMockedFetch;
});

describe("handleSubmit", () => {
  it("works", async () => {
    const state = await handleSubmit({ preventDefault: () => null });
    expect(state).toEqual(1);
  });
});

