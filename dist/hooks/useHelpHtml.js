"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useHelpHtml = function useHelpHtml() {
  let help = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let images = {
    visitedNode: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRUE1MUM3RDkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRUE1MUM3RTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFQTUxQzdCOTEyODExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFQTUxQzdDOTEyODExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAQABAAwERAAIRAQMRAf/EAIkAAAEFAQEAAAAAAAAAAAAAAAACBAUGBwEIAQEAAgMBAQAAAAAAAAAAAAAAAQQDBQYCBxAAAgEDAQUGBAQHAAAAAAAAAQIDAAQFESExURIGQWFxMhMHocFCcoGRIjOx0VKSIxQVEQACAgICAgEEAwAAAAAAAAAAAQIDEQQhBTFBEoEiMgZRcTP/2gAMAwEAAhEDEQA/APVNAFAFAJaSNfMwXxIFSk2Q5JAssbeVw3gQaOLQUkxVQSFAFAFAcZgoJJ0A2k0QbIy7yLEHlb04xvbcdPlViNaissrOcpvESl5D3K6YtZmijlkvZUOji1QyAH7/ACfGsM96C8Gzo6K+xZfAmx9zel7iVY5pJbFmOim6jMa6/ftQfiaiG9B+Sbuhugsrkulnkjyq3P6sLAFWB12HcQasOEZLKNX8pVvEiVVlZQynUHcarNYLCeTtCQoBjk5iAsQO/a3h2Vnpj7K98vRj3uB1HPkMlLhLaQpj7XQXpU6GWUjX09R9Kgjm4nZWt3Nht4Xg67ousUY/OS5ZWURUUKgCqNgA2CtedQlg6yqwKsAQd4O0UJwT/QvUU+IykOLmctir1/TgVjr6EzeULr9D7tONXtTYcXh+Dm+76yM4fOK5RsuMmOrRE7PMvzra3R9nF0S9EhVcshQETkif9hu5Rp+VWYfgVpc2L6Hn8O8lxdyyfuyXVw0mu/mMrVz1n5H0/TSVSwLrwWQoBvfu8dsZE/cjZHjI38ysCvxr1DyYdhJweTXbvrqyxr/4YZJ54xoVYGJQSNNvMOb4V0L/AM/ofLpcWv8Atl2TIWD+S5iY8A6n51XLA4oCOykWjrJ2MND4irFL4wVr1h5MQ6vxEmH6iuOZdLLIu1xaydnqNtkjPfzfqHjWm2qXCR3vS7sbakvZGVVN2FAPenMRLm89b2qLzWtrIlxfyfSFQ8yR+LsN3CrGtU5yNT227Gqp/wAmxTdN4zMKUvItQg0SVP0uDr2H5Gt5a8LB89qy5NssTxRP50VvuAP8arFkVQCJYlljKNuNTGWHk8yjlYK5nMBZ5C0exyMAmt5OPEbipG1SO6s8oRtXJjovs15ZiZ5fe2WRiuhHi8gskLKWEd2pLKAQAPUQjXf2rWvn179HTa/7KsfehVn7XZaVx/0cjHDD9SWiHnI7nkJ5f7aiHXy9nq/9ljj7UX7AdO2OMtVssbCIohtdt5ZjvZ2O0k1sYVxqRzGxs2bEsyLNBCsMYRfxPE1hlLLye4x+KwLryegoAoDjKrDRgCD2GiZDWSNisLeW9unAKqnJEND2hec79f66yq2RjdMRyuOtlO0FvE/y0o7pBUxHKoqDRQAOArG3kyJYO1BIUAUAUAUA3sopI4SZBpJI7uw2HTmYkDZwGgoBxQBQBQBQH//Z',
    currentNode: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRUE1MUM3OTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRUE1MUM3QTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFQTUxQzc3OTEyODExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFQTUxQzc4OTEyODExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAQABAAwERAAIRAQMRAf/EAIoAAAIDAQEBAAAAAAAAAAAAAAAGAwQFAgEIAQACAwEBAAAAAAAAAAAAAAAABAMFBgIBEAACAQIEAwUGBAcAAAAAAAABAgMABBEhMQVBURJhgZEiE6FCciMUBnGxwTPR4TJSYkM0EQACAgIBBAEFAQEAAAAAAAAAAQIDEQQxIUFhEgVRgbEiMpHR/9oADAMBAAIRAxEAPwD6poAKACgCvNuNhCcJJ0VhquIJ8BUUroR5aF57dUOZI4Tdttc4Lcpj2nD88K8WxW+6OY71L4ki0GDAFSCDoRpUyYynng9oPQoAKAIrm5htoWmmbpRfEnkK4nNQWWRXXRri5S4FTcd7u7tiqsYoOEanUf5HjVNdtyn4Rl9r5Gy14X6x+n/TNpUrwoAs2e43do/VC5A4oc1P4iparpQ4YxRtWVPMX9uw2bZukN/FivllX9yPl2jsq6o2FYvJqdPcjfHp0kuUXanHAoAU/uG/NxeGFT8qA9IHNveP6VS7t3tLHZGW+U2fez1X8x/Is7xuwsUSOJPWvJ8RBDjgMtXY8FWoK6/Z+BPXodj8GFJazXR69wuJLhj/AKwxSIfCike2nIxS4RawrjHhHK7ZBEeq1eS1kGjxSMPEElT3ivX15OpJPlZNTad5uPqFsNwIMz4/T3IHSsuGqsPdf2GlbacdVwV2zq+q9o8DFZXclpcpOmqnMcxxFR1WOEk0L697qmpLsPMciSRrIhxVwGU9hzrQxkmso2sJqSTXDCRuiNm/tBPhQ3hZCUsJsQGYsxZsyxxJ7TWbbyYVvLyKrubjd7+4bP03FtF2LGAT4sxNPVrEUXOvH1rXnqS12ShQBV3NGNnJIh6ZYPnRNxDx+YH2UI9xnozek32wito5ncFpEVxEnmbzDHu76rmsPBQyWG0Pf2xfxXGyW0hYKSv9JIxAOYHgau9OWa0av4ueaF4NaRetGQ+8CPGmWsrA9JZTQgOrIxVhgykgjtFZtrDwYWSaeGKkkZt94vrdsvVcXMR5q4AbwYU9U8xRca8vateOhLXZMFAFXc2b6N4ox1TXHyYV5vJ5R/GjOOp7nHV9jdl2Cwlt44inS8aBBKmR8owz51XN5ZQyeXkeftrabWHZLWOSFJGC5uyLicMgc+eFXenHFaNX8ZD1oXk2qaLAVPuKwaC7Nwo+VOcceT8R361TbtPrL27My/yuq4We6/mX5Fnd9pW/jRkf0buEkwT4Y4E6qw4q3Glq7PViNF7rfgwpJry1PTf2kkZGs0StLEe0MoJH4EU5GcXwy1hbCXDOUvxNlaQTXLnQJGwHezhVHjXraXLOpTiuWjV2nZp1uBfbh0m4UEQQKcUiB1OPvOedLW3Z6Lgrtna9l6x4GGxs5Lu6SBOObNyUamuKanOSSIdah2zUUPEaLHGsaDBUAVR2DKtAlhYRtIxUUkuEdV6dEdxbw3ELQyr1I2o/UVzOCksMjtqjZFxlwxV3HYbu1YtGDNBwZRmPiFU12nKHHVGY2vjbK3lftEyzlShWkdr/AM0XwL+VAF+y2y8vGAiQhOMjZKO+pqteU+ENa+nZa/1XT69hr23bILGHpTzSN+5IdT/KrmihVrpyajU040xwue7LlTjYUAFABQBWu7O0kjd5YUdgpPUVBOnOo5VRlykQz165/wBRT+xDt222CWduwt4+v008xUE49I514qILsjmOpVHiK/wv4YZDSpRgKACgD//Z',
    theGraph: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0Qzk4NjExODkxNUIxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0Qzk4NjExOTkxNUIxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRDOTg2MTE2OTE1QjExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRDOTg2MTE3OTE1QjExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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',
    infoPanel: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTVBMUE2NTkxNUYxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTVBMUE2NjkxNUYxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFNUExQTYzOTE1RjExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFNUExQTY0OTE1RjExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAMgI1AwERAAIRAQMRAf/EAKAAAQADAQADAQAAAAAAAAAAAAAEBQYDAQIHCAEBAAIDAQEAAAAAAAAAAAAAAAEDAgQGBQcQAAEDAgMGAwUGBQQCAwAAAAIBAwQABRESBiHRE5NUFTEiB0HSFJQWUWEyI3NVcUKyNTahw4S0gVJiMyQRAQACAAMGBQEJAAMAAAAAAAABAhGRAyFREhMEFDFBcVIFM2GhscEiMnI0FdHh8f/aAAwDAQACEQMRAD8A/UkmVGisE/KeBhgMM7rpIAJiuCYkWCJiq1ja0VjGZwhMRMzhCD9Uaa/doXzDXvVV3Ol7q5wz5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905H1Rpr92hfMNe9TudL3Vzg5N905J6SYyxxkI6CxzFDF7MmRRL8KoXhguOyromJjGGExg59yt3VM8wd9Sg7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+g6k+yLXGJwUawReIqog4L4Lj4baDl3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gdyt3VM8wd9A7lbuqZ5g76B3K3dUzzB30DuVu6pnmDvoHcrd1TPMHfQO5W7qmeYO+gkUFHrX/Hnf14n/aarz/lf69/T8210X1aslXDOjKBQKgKkKBQKgKka6zf4nZv0IH+3X0LpvpV/jH4OW1v3z6yu6vVlAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFBXB/Z4f8Axf6woLGgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgj3L+3Sv0XP6VoJFBR61/x579eJ/2mq8/5T+vf0/NtdF9WrJVwro1nZbYzMR83c5owgqjLWCEWOP8A7fwr1PjujrrcU2xnh8o8ZzafVdROnhEYbfOXl60C7NGPCziqhncCQigTeHjmXDw/hU6nQRfVimlj4YzxbOH1/wCivU8NOK+Hj5bcXhNPzVfbaE2jR0SNt0SVQVB8dqJ9/wBlY/5WrN4rE1nijGJx2bDvacMzMTs8vNyj2aVIaYdAgQZBq2GKriiiiquOz/41Xo/HampWtomP1zhH3/8ADO/VVrMxOP6Yxdfp+XxTDjMYNjmePP5Q+49mxat/ytTimOKn6fGcdkerDva4Y4W2+Gzx9HjsM3jm0RNgDYI4T5Fg3lLwXHD24L7Kx/y9XjmszWIiMeLH9OEp7ynDE7duzDzRJsJ6G9wncFVUQhIVxEhXwVFrV6npraNuG3/q7S1Y1IxhwrXWtdZv8Ts36ED/AG6+h9N9Kv8AGPwctrfvn1ld1erZfVfqFaNOXCLbXYk25XKW0chuFbmeO6jLX43CRSBMqfxx+6gi3X1V07AC3o3FuFwl3GMs1q3w4puSW4wrgTrzRZFARLFNu3FNlBGn+sukow2tYrM66FeYpzLc3b4yvuOA2qoYZEVCQxyliipgmC4rQep+tOkEtFjujLU6SzqAn24DEePxX+LGXKbRNCSlnUlyjlxx/htoOjHrFpN/ToXoGpudyatsbtPAxnrMHarCMiS+bBcfxf60FVqb1vgwNNN3e1WuXKfSelvmwn2SaciuoqZwfFFXKaoXkRMUJdlB9Gt0342BHmcB6N8Q2Lnw8kOG83mTHK4GK5ST2pQZa7arG3eoLVulXIo9ubsz9xkw1jgrWDTvmfKTm4g5RFUyIOHtoMyPrON51XpS32OPLiwLtIfGQc+KTSSGAbxB2M4qqJDnRccFx+6g+l2q6xrpD+LjC6LXEcawebNk8zRq2XlNBLDEdi+2gwmkNdajv09k0mWgTJ827hpg0dZuUNsSUVUjNwuIYYYknBEV9i0EjTXqRNuEq/2+5Rm4syE9cFszgovClxoLxsF4kS8RsgTiJimwkVEwoI9w1Zr36U0/qKE9a22rw3ahejPRZDhA/ciaAyExkt+QSexQVTHBPGgsbhetaM3W06aGVbW7xcGJUt25nHe+H4cYmxRpmMr+cnFR5FLF3BERVw+wONl1TqrUNkemW+ZaoL1plzIF3efYekxzOIaJxmCCQwoNkHn82bx8dmKhxh671MWjbdLdjxntSX43eyRwbdZZWMOJhKfbJxxwGxYRHDRDx2iPitBpNN36Zc9D26/SAbGZLtzUxwG0JG0cNlHFQUVSLLiv/tQZRz1is6+n8S7s3a0ualfixXXLWkgCVJD3DR1tGEd4vlzl5ccUw20FxH9RrHH1FqC0326262dskstQgkSG47rjTkRp5TJHTTN53CTEURKCptXqqDjOnJl1lW+Fbby5dwemGfCaywJKtRlbcccyfmCmJY44+zCgkTPVWAEvUDtueiXe2WiBDfjlCeFxXJct91lGSdAjBMSFv2Ypj7dlBYw5+u4d1htXd+0TI8skCRFiI5GfjZkXKYK865xxzJgqZRLbinhhQc/UDW7mn5Frt0eRGhyrpxz+MltuyAbbjoCFkjsKLjzpE6KCCKntX2UFfK19d2NFxbwMm2Pq/PSE/eWxfWFHYUiH4mQwSg62qEiATaueUlRVLCgn6T10syx3m6XaTFettneMBvkMTbiymm2hcNxoDJ0vIRK2uBkikmxaDpoTVWoL5OvLN4htQUiFGchxgQuMDEppXQGQqkQ8VBwzZUREXZtoOq6vuPbjvLkKJEsAIThXCVMIDFkSUeITIskm3DFB4mK+HjQRPTHWepNTw5r18tHaTYNv4TAXRF9l0M4uDxUFcFoNrQVwf2eH/wAX+sKCxoMvqv1CtGnLhFtrsSbcrlLaOQ3CtzPHdRlr8bhIpAmVP44/dQRLv6r6ctwW5AjXC4TLlHWYzbocU3JQRxXAnHWiyKCCqKi4/YtBJtfqXpe6zbHEt7jshdQMPyYDwgiNoMbFHRcxVCEhJFHDBdtBWSfWnSUe3RZ5sTjamTn7aw20wjjpSI+whQBNVXMqog4eNB4uXrRpq3mjT1vupPtRm5lzZbhkR29p1MwrNTN+UuG1U20He8+sGkrZJVkAmXJtqM1NmyoEcn2YsaQOdp18kVMqEC5tiKuG2g2UWVHlxWZUZxHY8gBdZdHaJAaZhJPuVFoMPdvU+RA9S42jhskyQy/HF1ZjTSkqkZIiGG1BVkMcHDX8K4pQSYXqzpiZa7LPYblF32ctsiReGKPg+JKJq6GfARHLiS4rgipQVzHrtox2QALHuLUVZawHbk5FVIjUhCyoDjyEoopeKYY7Nq4UE+8er2lLVdpUCQ3NcYt7rce53VmORwojruGUH3sdi+ZMcEXDw8aDVRLrFlzpsJoXEdgE2L5G2YNqroI4PDMkQXPKu3KuxaDMwPUiwt3e/W6/Xa22x22z/hojT8huO4bHw7LqOELrmJedw0xRETZQdNFa6C+RLS3KFEuNziypwEwn/wCfgxZIx9iqZFivEBU8fbQernqdaMsFItvuE+RcQmHFjRWQNxUgP/DvY4uCI+baOK4Kn34Ioe1j9TbFeZkBmNFnNR7qDh22fIY4bD5MAputguZTzgIl+IERcFyqtB0geolslSijPW+4W8jjPTYZTY6MpJZj5eITSKSkiohiuVxBLb4UDTvqNaL5NhRWoU6GlzirMtkiYyLTUlsEFT4SoZLiKOIu1ExTamKbaCZftYwrROat4wplzuDrRSViQGkdMGBJAV08xNig5tiJjivsRaCEHqRZJE22w7dGmXJy6xQnRyisoojHNzhK46pk3w8hfiRdvsTFdlBwZ9UrG9KhthCuHwdyljAt10VhEiyHiNQ8h582XyquYhTFPw40E1vXlvW9s2t6BPjBJkHCiXF9jhxXpDYkStgSlxNqNllJQQSw2KtBEsvqfZLtLt7LUKexHujjrEG4SGBCM4+yhkbSGhkWbBosPLguGxaDtb/UeyTbhGjNx5jcSc8cW33ZxnLDkPN5sQbczKW3hllUhRC/lVaCHb/UJhu1wOI3LvVznuzeDHgxRB1Wock2TMmydUABvyjmVzzexMVwoLLQGpJGorC5c3vAps1lhFBWiRhmU421mAvMhZBTNj7aC8uX9ulfouf0rQSKCj1r/jz368X/ALTVef8AKf17+n5trovq1ZKuGdGnWyRBZVz4lHQIsOE+wSiYfb7UTbW90WtpUx4+KJ8rVnbDW6il7YcOHpPmsXNQxCkAKg4cZGSYcMsvFLNht2bP5a9G/wAtpzeIwtNOCazOzinHz+5q16K0V8Yi3Fj9jwzfYUZyK0w24sSOhoSnlzqprjsRFw8ajT+U0tK1K0i3Lpj44Y7U36O94tNpjith6bBu82uOERpgHlbjOkaqaDmVCEk9ip7SpT5HQ04pWkX4aWmduG6ft+1Ful1LTabcONo+37EWNc4mac1JFxY0ws2IYZxVCUk8f41q6PWaeOpW8Twak+XjG3FdqdPbCk1w4qO8O8W+K682w26zHdEERxFEnM44+ZULEduNX9P8ho6VrRSLVpaI27JnGPPbsV6vS6l4ibTE2jJCu88JskXAUyAAQEJzLmXDFccBRE9taPX9VGteJjHCIw24Y/c2em0Z064Th4+SDWk2Gus3+J2b9CB/t19C6b6Vf4x+Dltb98+srur1b556p6AvGqZEN2DEtcoY7TgIU45MaSy4W0XWZMXEsEXBVAhw2ffQZ26ei+ozKyXD4mFf7pBtnbLgF2ckg25g6TrboOsYuKoKeXzeIp9tBeaZ9MLlZdQaYniUIIdlt0qJKYj8YfzpLhOYsi5xFUEUtqk5ivjhQV+nPSXUVse0kb8iGQ2G43KZLRs3VzNzUThI1i2OJJ/Njh92NBBuvoheprFyeJ6C7LPUsm/QIzxv/Dux5GH5EgmxAwPyptDN/rQSj9Hby5oO42pgbXbbzLuDVxYbi/ElERWDQhB115XHTVUxxJBT+FBopPqvbLQ722+RJhXiOIDPW3w5L8XjKCEXBcUcSDFdirQVD+nU9Qb+7qSI4UWySrHLsLoSW3WZYvPGq8QWTFEUEQ/FS2/ZQRLJ6a+o43bRp3mZaTtmkFNmOEXjo86yrSNCZKYZVPABTKmCe3FaD6ja+8FCVLrwAmqbqYxFMm0bzlwl/MRFzcPLm2YZscNlBh5ejtZ3edaBvbdqIrRNZlrqJjiJOeCOedAFjhALSuoKC5g6o4Y4JQdZnptNl6VnW/4puLekuVwudmuLKqvBOW+64AnmH8Jtu8N0cFTBV8dlBNc0bcy0HpzT6OsfG2grQslzMfCLtzjJvZFy5lzI0uTEU+/Cg76803PvbcIWbfbLvFYI1ft11QgFSJERt1p8G3ibINuKZfMi+KUFYx6d3JrRw6cB6My3c5qv6g+HQmW0iuFmdjRAEfwq2AMJmw8mK+OygtNQen8e63UbtHuk+1zGoS29kIZsg0jKmpqmVxl3LmXLmy4YoI/ZQcNK6X1LY9M2vT7kpiXGZt5sTnnTMnAkZABoI+VtseAPm/GmbDDx20Ed/wBPnj9M4mmQCIl3YhQ4xysFRtXY/D4hIaBnwXhrguXGgtrRpVI1+1FcZrcd9u7SmX4vlzmINRGWFQ8wpgudpVTBV2UFJYfTyfBc078WsV1i0O3g5DaZiRUuMlXmOGhAieUVwLHDBfDGgkXr077ncNQKLjUOHd7dDiRjZH8xqTEeeeF4gwEVQScbVPNtwXwoIZ6N1NfL/Z7hqODZoxWh9uS5coWd6ZKNhFVoBJ1ptWGs5ZyHOXhh99BMvemtUzblZ9Ri1b3b7YpE1IsUnHm47sOWnDTF3IZg8jYiuORRxzJ7caCtP081EUNuc4cB+8re3L7ItjnE7cauMfDIznyKeICguI4rf49uWgkRvTWTcY16748FsW8y4stYVmP8pooaJkVTeaQXCcIUJzFpEXBKCw0noe5WPU96usm8yrjHuAMAw3JNsiXhgiEbyAy0mYVTKGVcMqrjtoIj+lb85boNqlWi23SDapHHhm/cZLCOEClwiejhDdBcuf8ACpEmO2g11khy4VnhRJkhZUthkAkSVVV4jgiiEWJKpbV+2gm0FcH9oh/8X+sKCxoPnnqnoC8aokQ3YMS1yhjtOAhTjkxpLLhbRdZkxcSwRcMQIcNlBWM+m2v7NNs18s11h3G/xLStnuR3VX+G4CvK8DgGCGaqBEg+bxEftWgiwvSHVunWdIydNzoMi62AJjc5J6Oiw78cqkahwkUvJmVETZjsX7qDpYPSPVEBrTaTJcJ120XuVdZptk6iG3IRMqNorf48fFF2J9q0FrdtF6+gawvl90fNtzYakajBN7gjquR3IocMXGUATE/IqrlP2/dQUmqvRm+TtRXC7Ru2XZbzGjsziuiyWCafYaRk3mhiKiEjgpmUFVMF8NlBfs+pmldNstaeciXEnLQAwiKNb5CsKrAo3+Uvn8nl8vmXZ7aD0S3XXUWsNP8AqBpwmm4IR3LfcIlzbejv/D8dc5tAgqvE2LlQ8E8PtoMt6eaaO4erN3u8Vt76StMmVMtRvtOMiU+4tthI4YuIKqIcM/Zs2fbQVeltAa71HpWVYieiQtMSr2/JnJIbeCeItPoSi1s4ZCeVCRVwX/xQXl99D7lI1LeZcRi0zIF8ljMckXFZnxEZVLO6AtMEDboqWKjmIfsWg+s29u6tSZTUkY6W5vhDbOEpq7kRtEc46EmVFz45cq+HjtoKqw6VSHcdQS5zUd/utxWZGXLnIWvhmGcp5xTAszJLgmKYUGdtmh9W2NvT8q1lAkTrZGnQZkZ9x5pk2pkgJAG24DRlmBW0xRQ2/bQStG6Gvlnl2WTcJEZ47fEujEsmFNEJ24Tm5QE2JCnlQQXNiuxfDHxoPWDoG9x7VpKIkphqRYFlrJfbUy2yIkhhsmUUEzKJviq5suxKCmsXpfqWNcYUyb8CDsW3TIMmUEqXJflvSWwFJDhPh5cSBVUExy4+K+CBqLfpC4xl0XncZX6ciHGm5VLzkUQWEVrEUxTMP82Gyg6Xux6lZ1P9Q6f+Deefgjb5cWebrQojTputOgbQOr5VdNCBRTHZtSgjaQ0LNsFyhvOSG5DLFq+CeNEITOSco5LpiGCojaq4uHmxoMLb2rysvTWlIb5vwLJd23AinbpLEpuLFM1RZUg1WPkAdgkH/wBi5cPbQXUP0z1OmobbPmnDfK33Vy4PXU5Mp2XJZPjIDfBMOEzwxdEcokqLh7PaF5A0PdY9g0rbjdYV6x3FJsshI8pN5ZA4NrkRVL88fFE9u2giWnQ2qI7FjsMt6F9PaelhKjSmidWW+EdSWM2bRAjbajmTOSOFmw8ExoPW2aH1ZYittwtZwZNxihcYsuLJcebZNidOWY2QOg2ZCbexCRW8F27diLQaLQVgutisJw7q8y/OcmTJbrsZCRtfipJvJghoijsPw24favjQXVy/t0r9Fz+laCRQUetf8ed/Xif9pqvP+V/r39PzbXRfVqyVcM6MqAoFAqQqAoFAqRrrN/idm/Qgf7dfQum+lX+Mfg5bW/fPrK7q9WUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUFcH9nh/8X+sKCxoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoI9y/t0r9Fz+laCRQcpMWNKYJiUyD7B4Z2nRQwXBcUxEsUXBUxrG1YtGExjCYmY2wg/S+mv2mF8u17tVdtpe2uUM+dffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOZ9L6a/aYXy7Xu07bS9tcoOdffOaekaMkcYyNAkcBQRZQUyII/hRB8MEw2VdEREYQwmcXPttu6VnljuqUHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UHUmGSa4JNirWCJw1RFHBPBMPDZQcu227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UDttu6VnljuoHbbd0rPLHdQO227pWeWO6gdtt3Ss8sd1A7bbulZ5Y7qB223dKzyx3UEigUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUH/9k=',
    legend: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkYAAAAuCAIAAABCh0ElAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAxIDc5LmMwMjA0YjJkZWYsIDIwMjMvMDIvMDItMTI6MTQ6MjQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDNTc0RUQxMEU3NTExRUU5OUEwQ0Y1NjVENTg4RkJGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNTc0RUQwMEU3NTExRUU5OUEwQ0Y1NjVENTg4RkJGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGMTQxNDdEMEM1ODExRUU5OUEwQ0Y1NjVENTg4RkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGMTQxNDdFMEM1ODExRUU5OUEwQ0Y1NjVENTg4RkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+flGY+gAAGw1JREFUeNrsXQdYU9f7xoQwhACKyFAh7oGggAO3ggKCA/fEbWvrqFarturPWq2zrX/bOkodICjuAW5QFAeIgkypIDJEZSiGlQAh8H/D1YBJiCQmzPM+9+G53Jxzb/Ke73zv95177rlNysrKVAgICAgICOo/aIQCAgICAgIiaQQEBAQEBETSCAgICAgIiKQREBAQEBBIhKqUz4qLi3k8XklJSWlpaUNWdRpNVVWVwWCoqakp7yqNhExCLOG2kSYHpEXqBsNNJM54BHFcLpdOp6MyzoJzNWCmYBwwEfxkPp+vqampcItsVGQSYgm3jROkReoIwxIkjcPhUHVAXKOiDHxxOVy6Kr1p06aKOqeAzBK+ZtNGR6YoseW9UcHENkorJUZLWoQwLIVhUUkDdxBDbW3tRstXfn4+IiCFmCMhkxBLuCUtQlqkJhmmieS2iHwbOXf4+QiIQMWXDxTgPMQQPyGWryBi+YRYpRkt4Za4kfrM8CeSxuVyNTU1CVlI8EHFF55EQGZTQuanxGoqiFhipcozWsItcSP1mWFa5XCATqeTsVoAJICKL4mwCJmEWMItaRHSIjXPcIWk8Xg8pU4/rV8AFSBE7uqETEIs4ZaAtEjNM1yh/yUlJTKPOWQEqWSHqeQnqhS9E/yrrq+i3V6luY2K4eAGoP9fMmggB5lFr7KKMtglOfmlhYIWomkwVHW11Q311FsZNLDAqoaJjX0Xl8ROTi/IKOAV4F8thpaRlmFbPZa5fteGF7TWMLclIcG8qCh+cnIpmy0wWj09OovFsLRUte1HvG2ttAhhuGLG4/v375s1ayaDmKWeUinMkvyphoGK6eT6LmyyEfIFdSFmBfGvSrlFEj+laaprdWrVkIStxoiNfRsX8jo0tzhP4qc6akxbkz7mLRqUsNUYt7yQ4CJf39LsbMlG27y5+pgxDCJsNdgihGHRLE0GJHqqvL4irQCkLn6vSn6SSvvZhHHpKIhN5qZkSCkAqcuLfFHCLtAyZxG6qo/bqUFPMqOkFIDU3Ui+mcXJGmo6mNAlEwpPnSy+dUua0WZncz08+KmpGpOnELoIahKyP4L+WT0TAsVQmOAL9EwIFENhwpii9EwIFENhwpgC9UwIFENhwhhBHZa0jKDq6plQ1TKq9BfcwsLomJiIyCjsNELqi15lVVPPhKqGKlIKsHNyHj0OS0h4zufzlfrNA24GXrl6vc4SG/s2rpp6JlQ1VJH4UU5uLljFxuFwiLNQKR9vrKaeCVUNVT6jkYWFBfn5sn6TsrKyy5cuJSdXGefl5uRcOH8+NzeXtFo1IbR24SbRk5w+cy700eOGImmpp2S+QhVVvI+fMLe0Hjt+8vhJU7Hj6eXd6FK0+FeKqlJUVLR23Qbr3v2mTHdzdBnTs5dtyMNQ5X1z/5s3/S5drrPEhrwOVUiVvLw8q162YBVb9569HJ1H/2/T5vT09M+ezf3g4efPExX4i55ERJ44dbpOxGG+voqtAmXatWPHb7t2SVxsVgRJSUn37937EOFxOI8fPYqNiamq8KvXryMjIl6/fi1SUW5Q/v3K5cvxz541PHdU2dqFW1S0BHqP+Zy8/yBYGd+BWosZzXrv7l25TyLLvTTkW4VZso9TZAkqfjpVBJnZ/37+ZfmyJW4zpzdp0sTL+/imzVu7de3au5dN40nRqpoPIq3JuUWoKD5V5Kj38VOnz+7/e8+gQQPfZ7/fsnX7dLc5MRGPFbjKXH1B7Lu4quaDSAGqoKLEOZDrf1o7sH+/vPy8sPAIj6Ne9+8Hn/Lx0tfXl3K27Tt/M2jRokOH9or6UQ9DHx064jl18qTa5bYkJLiq+SDSjDY7GxWrmgOZkJBAObLE5887dOwo/VTPExJCHz4cMHAg9ptqaf2wZo2UCYFdu3Zd9cMPWuXrblSuKKuTfRobGxYWlpmZySkoUFVVLSkp0dLS6tS5c4PsPpS1C/9lscxq4KIpKSlonVdpaUipIQc4YmpqOnDQIOVLWnaYnF8ZFT+VNCpvXfzNIjpdkCYu+XYRTKfw4/Bj4oukm7cCEedaWnQfMcLesGVLHLx7737C88R5c2ZRZS76XqLRaaNdnB89Dgt/EtHLxvqi3yXrnj1dx45+z2bf8A8IC3tiYmLs6DCia5cPxvciKemG/83klBQUdnZyrF13X5TBlruiuKQ9CA4ZNnQIfqygq7fS3LxpY+vWrbOy3pqZmfJ4vFNnzkVFRzO1tQf074diKINUw9Pr2IRxrn6Xr7x5kz56lHOf3r2QByAoY5mZzXabqaPDpMrMnD7tgq8fqEO04ezkhOOibq6kxD/g1oPg4BYtWtgNG2LRvXvt9skkdrLcFSVKmplpm06dBK7WxtraccTwUa4Tft2+849dO3Dk3bt3PidPJyUntzIxcR7p2KVz5+zs7H8PHcFH5y/6JiQmrlrxHY1GgzHfvfegsKiwh6XF5IkT6HR6+Whb0cnTp2NinurrN3dxdhLyJm6lSIhv3rqNa+3Y9fvgQQP72fatLW55UVFyV6xK0h6FhhqbmCBFQ2xeWdIgQnFxcfl5eWYsVl9bW5CGAv/FxcHeLl64ALmCqNwODOxmbq6poRESEmI/fDi1ahRyqcuXLln26NG8WbPAwEB7e/v/gEoV0SNSU1NHOjtTF3r79i0SODs7O6aOjmg0XljoffRoVlYWvl6//v11dXX9fH2ZTGb/AQNSU1IgbyatWjUwSRNauwhuBd6+HXSXTqNNmTyx8vHXr99cuXYt7r9nPS0te/Wyga2uXPEdGqv6buGSn190VFRxcXGPnj3Nzc3PnjlTVFzs4OTE4XAS4uNxUJkDj/nyjqWIVWzbloW/h454UHfRoMzfLV08aOAA7P/37JnrhMlXrl5HZz542GPKNDd0ZhyHbl24WDGCEXgnKCBAMKb/NC4OXX3R4mW5uXnq6upIn2e4zf3tjz3qGuq379x1GTMOEa6ghzxPHDt+sn/ATQaDsWPXH4uXrVD2DafPBLw5+Qqs2L59u8Dbd7Dx+YKAt0UL/XU/roaeYf/bpcuRNGhqaCYlp8z/6htomMAXZ7//599Ds+YtePv2XdqrV7PnLZw1d8H1GwE6TObuPX+tXL1WWGbStBkIGtTV1H/dtvObJctgqSKX3rhpy+of1/FKSp5ERIJhiu1aRHpBhvIqgtLZbjOoQd2CggKnUa7ow8309G7fCXIePQ5qRKPTqQE0KFkpn4/dw0c8Fy5ajCSPX8Jft+Hnn3/ZQp1q/leLQG+bNq2TkpLBW2RUdFVWWlpaJhyjE+e/JsFPTlZsxaKiIkiXtbW1lZXVs2fPhMtAIGY/5u2NoKq0rOxmQMC/7u7UzxfywC9P7MIeP37z+rWunl7EkyfRH+UWJ3wSHo5EqoDDwXH8Famopq6O86e/eUMdxElioqO1xBZR5HK5PseOWVlbtzE1tenVC83tVz6CamdvDzHjcLmeHh64VmMY+fD08l7w9bcZ6RkFBRy3OQsSX7ygjmdmZU2cOv2wx1GmNvPs+Ysw6QPuB4vLH3yujltAc/hevAj9Q7hgZGzMYrFOnTwJk+jRo4exsXEhl+t/4waiFmVmadTz1PJkFqIV7YYOnTFtClwttoED+tvbDXUZORKOGB9t3b6rW9cux7088FPZOUucR7tC2Nb8sFL6FTwOuZt3E4TYB/7592Vamv9VPyMjI1C2/Psfrl670bdP7y3bdthYWx1yP4C8cO5st+GOLneC7toNG1pbVkI9T62oikhzHz8Oh2KhJw8ZPNDJ0cHebhiiVzjEoUMGr165omPHDig2Z/5XYAOpLVVr+dIlkydNgM8cNMwevvK4lyfIYbHMNm3eSkkjYD9sKHI+7EydMtF1whQkHFQuSAH26nPy1Ckfb6QU+Hf12nWoe8XvfC12P+p5auVV7G7ebd8Bd4QCCPaXL1syymWkro4OIrM+/Qbdvx/sNnP62tWr3A8eHjt61DjXMShvYmLsefhfKlxD5LF3/z+bNm7IzcsLDnn4957dyO1gpRd9L1GDbxKtdOyYUW/S05G34cy169qo56kVWDEqMlJAqYUFSLh65QpkCeIBo8U+tGTM2LGCMZvERETuUKDeffqw2Wyokeu4cZVPoqGhgfQuMjISnhH/Yqd58+YGBgZvPoqWSEVcS01NDcXgRvEvLopUQOT1Y0gRvDw9Bw8diqzu1q1b7dq1CwgIwHFDIyMUxtfGd3Z2cTl79uzCr77C5WqrRXzOXJO77rSJTuIH4X4PuB/6kO7Qmpw87lVYWIRODQ/z/fJlOHj/QbDbnPlUAe9jPjxeyfXLF8EAPMaCr79JT8+opltAK1w4f15TU9Np5MjTp061bt367t278EIIFxA0IHVGE7jNnu155EjLli2RiytH0hQH9Fg4ygXz5/kHBNy7H4wfjLzq9AnvTh07gg5kGNTgjJ6ursPw4cjPpJ9NX1+f0jOKTbuhQ6BnVPK3Z/dv1IB40N17RkaGHkePCmvFxD6tRUlTLEDU+TMnIiKj4AGvXruOHNfSwsLL4yCTyZw0YVxY+JPQx2F5ubkUCcJaUHqqLVhmZubdulGDwKZt2pQPJ34QTtexY6gdnLAti/U07r/KkhYTEytwIlFRkeUxMjJsbPDvUNOGGrFSORNdlY4IDHoW+uhx+pv0nNxcRPHvJTluhBewtFOnz6LMUe9jKAaXDRXs2KH9mp/Wx8TG9rPt6+LshLSswVvpJ4H/kSPCyYo7tm0TjkFh+9CRw8OxCcv/c+CAcH/Txo3C/RvXr2MTPy7cP7Bvn8SKIcHB2ISJmrqa2ghHxwrao6O1tbWhZ9g3MjREukAdd3B0hNt98eIFhA1bfHw85G3osGENpl169bLu3KkTtU/d1nqeKBhjGzPKhTo4oH8/xM3UPhzOsCGDKUWH9xg/biz8TzXdQmZmZkJ8/PerBFEa3PWtmzep44hLdHR0EMSMdXWFvA2zs0MsojRJU9eXZ3oIVbGKcdsF8+ZiS0h47ugyxsvbZ/26tejzOsyKQW0dHSYiYumnZzAqfgU7J6dTS9FbTUXlAxqIIBITk4SxtpmpaS2aDk2DUcotlq+ixOOwP6uePbB9t3TxhYt+K1evvX0nCN5w2szZcIvDhg4xMRbIvBqjYsk4+OXK1SWeVodZcfMMtpv9/n3lT6l/hayigOOI4UVFRbUoaVoMrbzifPkqVqcYRAiq30xPD7100tSZSBFs+/bWb17lbJF1G35GxGpjbd2+fVuEtEK2T/p4nzt3IeBW4AH3g4jJjh45SN2Kr1NWKmp7enpyTA+hKoocmT137vvs7D/37BE5vnzFiozMTJ9jx75bvlxPbOEMSAsc3LoNG6h/N2/aNHzECDhBhPxbt2yxHz4cFuhz/PjqNWs0mzZFluZ+4MCib781LNekyhUzMjIgdV8vWoRc7Wls7IqVooNAFhYWDx8+hKYiWUSulpKSgkAEuSDStbtBQd26dUOZhyEh0LYRDg612CISM60vgcNwe3u7TxSaegqCWekmeksDg49pHI1fWnH7hl/Cr75bQKOw2rZFBIPU2draOiwsLIfNhlgOHDQoOSlJV1cXevYyNTXA33/8hAlKG3jUbi+npGmLTv368+99XC5XOJzYsWMH+OICDge/GdFrdEyM80hHYSBgbSW4Q6iurp6ULDAsKoF7+fJla0n3ZpFMIDVGwEuNJISFh+fnc4YMHojTOo90gruniuXlCW681aItqupqF3Oz5asoPiS96NulyBhGl0dScJeODsNXrlbhcLkPQx9Bz/yvXW7frq1K+e0x6sZk9YHq1KAlgiw4cWowTQhq6s36n9ZQc214PB4uqit2m70mYaRlKJ+koeJny4ABr2M+1Mgt4gboWci92zBImOXZ8xcql6RueiHAgp5t+/WXKZMEN9W9vI9vLL+XhvJqamrz5s7GBg8+buIUTy/v7b9urmtWKjq4wmLJJ2moKH4QXgx/F379NaN8pfliHu+guzsO9u0rmP8CFaEkrbCwEJlQl65ddaq2K0E8Z20dERGB4KBtu3aan5v5BX+Kk0PPoqOi+traihfAGabPmHHk8GG4KUhm+w4dEhISHBwc4Fg6de6M6hDIB/fvz5g5U09MrRsYqIm7sbFPqWl6MOmkj+k1nPbBwx5v3qQbGxuh78PUZXIL0CowfOH8eScnJzQ6sm3ku+gXsHlEKtCzEydOODo5de7SRWmS1txG5W2IPKw0txHLz0xXrFqN1H6kkwOdRr989dqTiMhZM2fgownjx23f+Vv79u0su3e/dsP/3v0Hhw/+g+NdunRGArfvgLuLs9OdoHsoL1HSoIWHjnhs/nXb1MmTEl8kLfluxeqVKyBp48e57tj1O+JrNEPoo8dr1204sPdPhxHDa8tQ1A31itOz5aso3p/Rk3/a8HNpaZmNjVV+fv7e/QLG+vezpRLcW4G3Ven0oLv3rl2/IetjEv/btFlPT9egRYsD/x4E/wMHfDJvDWfDpZcuX7l82eImTWhbt++EZF6/4leLPbCtHivhfaJ8FauQsXgYak5u7pMnEd7HT7Rlmf24RjBa0qxZM/zYB8EhJiYmHp5HQU7FqVgsmLSFhXm7toJIIjgkFESlpKTu/H03VQDBmcPIUZCuqVMmwSMge2OVZ2NVWSnLzBTXunL1ev/+tnq6urXFLcPSkldpMFCmiuIHw8PDIVRgT3ikU6dO4WFhdvb2Jq1aIX5nqKkxmUzE6WkvX1r26IECBgYGiBVQBm5OOPxFwcbG5lFoaFZm5sTJk8WvJV6xd+/e1HCilZWVxO8Mw164cKGvry+ULzMzE+c3aNkyKysrNibmpI8PWh9JXlMtLZWGBcrahf9269oFOZlt3z7rN27apa6Oj3bv+Uv46ZzZbr5+lx2cR/e37fssPoFKNqrvFpCHzZk792ZAwL69e0vLytBGgmk4+fmpqalXLl9Gh5rp5mZcfr9TaZJmOFjaUsVVQcNAfP3iMaNd2DnsTZu3/r77w8jDT2t/wEFB1DZ/Lpzyjl1/gAX07R1btwwdLHhAYfDAATOmTQGh2EAxNRldHPAF+//e88f//enpdQz/zpwxDYEwdr5aMC83N2/rjl04LWz6xzU/1KKeCZSplYGUpYqrHMDRVJe4fvGG9T+WlpUiShD2Rm/Pw21atzYxNpk/d862Hbuw2VhbI8dKS/vM891NyrNb4Tjk98uXLVuxCuYFN43YgrrThk+pYujYXh4HN2zcPHb8ZMqU3ffvrd0+aa7fNeRVqKyPpumoMcVn8FMkCE20n21fGKfbzOnM8sFYqFFwyMPZ8xZif8b0qV0qPai0dPE3G37+xXn0uIS46D27f/tp/UZfv0tGRoYI2vb/I5i816F9u82bNiJ02/OXgK5JE8fPcpshxUoHDx6E5kN8huZY8u2iWhtasO1Hq3qp4iqNtnlz8Rn8iMG5HI61tXXlg9Y2NvHx8WlpabNmz/Y5fvz0yZNUwgTXplE+ZtXN3PxuUJCfry+kBfF7ZUM1NDLS1dWFoXb+2BDUB7TyAuIVe/bsCUkzMjbWZjKr+ua6enpus2bt37dPjcEYNmwY6vpevNi6desRjo5dunSpaqy+nkLE2imcP3Oyh6XFX//3+4pVa6hZIQvmzWWzcz7wo6Nz5uSxwDtB8fEJo0e7aGpoLFy0WCa3wGAwnEaOLCsrQ9Y71tWVz+efO3cO7QhL6Nqtm4Zc9y9kXIk/I0iwHrFM6LS4qiX5kcWnvXpVVlrWpk1rkRlH+Fa5eXniuWqRAMXiT0eJA2G1tpY2NeWh8mnZbDYoE7mcRCh7Ce2iV1l5kS9kOi2zRzspS/IjwU9OTtHV0xUOdlMoLi7mFhbKOh4Y+zRutOuEoEB/YyPj3LzcZlIHWDhcLsit5qN+yiY29m3cjeSbst1CYNnLtyS/YKGsJk2aij3wy+eX8vkl1MuuYOc5OTkSre49m63DZArDW+lWinZEYCvddJXNLS8kmOvhIdNpNefMkW9Jfjg4/GTxh6mRb4ExORSlckXo076//54wcWJ3CwvptZ6Eh6MFkUAoj1Vl1FU40MdpTWgaGhUj4Y8ehwXevvP1Vwso37Jy9dqwsCe3b16X1S0gLfsvLs6h0vScL2FJxhmPEKf8JBmWeTRxlvKKGXROKuqXGDJIdMHq5ajOlSVWx2nrjolAnErYBdVf5lHTzFD6K2YQ8lD3vUSgVg65vyfCgmafu2HQtC691QnilMXJqv4yj1YtLeV+xUxV3RWk0elqQjuvyuokEluVldaFt0FCnPipqdVf5lHNzk7uV8xAfiQuDiL3W56FFQP8/R8/eqSjo2NejZUBrD5NJRstxPs4UhGvYz6nz5637ds7Ojo29eXLndt/lcMtmJZDYWMJMteg3hdTHVWDnpGXy0gF9b6Y6qga9KyGXy5j2LLl+p/W1u5cD7lBvS+mOqoGPSMvl5EJ1PtiqqNq0LO6+XIZ5MF9+va17devgQ0e1jCMDA2DAv2vXruRlpZmbWXVp3cv4cNUtQjyCtDaHzEgrwBVUl3yClDl1SWvAK1rLUIYFs3SBEv4fJz7Xo0YfrBgg7BlhwnWu6LWB1HXF8zXb25T38VMpfz+R3WpkNilZSETcoUNwlaUwS7JyafWB6FpMFR1tdUN9RqSmNUwsZArbLHv4pLYyekFGdT6IFoMLSMtw7Z6LIkrOjZmbmUC5ApbSUgwLyqKn5xMrQ9C09Ojs1gMS0tVImYEtZ6lFRQUMBiMujBeXxdQXFzM4/G05J2kS8gkxNY7bnNycphMZo2JYmMAgoy8vDxdeZ+7IC0iB8MVZMFTCJcNJQAVIET+GJaQSYitb9xSb04hNCoQ1KKFpEVqkuEKSUPky+fzCYMUTdT6DnKfgZBJiK133JJwgQRwDYDhT1JaTU1NLodLaOJyuZpfPCtdQCaXkPkpsRwFEUusVAlGS8IFEsA1AIZpIgzSVen5+fmNmSb8fDqd/uV3awRk0hs7maLEqiqIWFVCrFKMloQLJDKu7wxXTA8RgsPh8Ev4mk01v2QUuJ5qPjiCa1DgC68FZPL54L2xkSlKLIcLHVIwsY3SSpVttCC2tLRUW+yVmASyBhk0Gk0hjUJaRCaGJUiaCrWEUnk/Qdz32TV46jtgLvAL+MmU9ih8Nl2jIpMQ2wC4JXEYiYzrL8OSJU3oMng8HupTr9xtqIArhKEoe2p4IyGTENswuG3M4QIJ4Oo1w9IkjYCAoDGjcYYLJICr1wwTSSMgICAgaCjKRyggICAgICCSRkBAQEBAQCSNgICAgIBA0fh/AQYA4xvmb+vyj+kAAAAASUVORK5CYII='
  };
  if (help.images) {
    _jquery.default.extend(images, help.images);
  }
  const _html = "\n        <div class='c-help__body' style=\"text-align: left;\">\n            <p>The provenance graph allows users to view the ancestors and descendants of a particular entity.</p>\n            <h4>The Graph</h4>\n            <img src=\"".concat(images.theGraph, "\" alt=\"provenance graph\" width=\"100%\" />\n            <p>The graph is fully interactive. Features include:</p>\n            <ul>\n                <li>\n                    Users may drag (<i class='fa fa-arrows' role='presentation'></i>) nodes around.\n                </li>\n                <li>\n                    Clicking any node reveals its <a href=\"#info-panel\">info panel</a>.\n                </li>\n                <li>\n                    The graph is zoomable. Zoom is activated by first clicking anywhere on the graph.\n                    Use the mouse scroll wheel to control the zoom/scale of the graph. Zoom may be toggled via\n                    the toggle button within the legend area. Zoom automatically deactivates once the graph is out of viewport.\n                </li>\n                ").concat(help.theGraph || '', "\n            </ul>\n            <h5 class=\"mgn-v\">Interactions &amp; Colors</h5>\n            <table>\n                <tr>\n                    <th>Graphic</th>\n                    <th>Description</th>\n                </tr>\n                <tr>\n                    <td><img src=\"").concat(images.currentNode, "\" alt=\"current node\" /></td>\n                    <td>Entity of the current page is denoted by a lime colored halo.</td>\n                </tr>\n                <tr>\n                    <td><img src=\"").concat(images.visitedNode, "\" alt=\"visited node\" /></td>\n                    <td>Visited nodes are denoted by a faint blue halo.</td>\n                </tr>\n                ").concat(help.interactionAndColors || '', "\n            </table>\n            <h4 id=\"info-panel\">The Info Panel</h4>\n            <img src=\"").concat(images.infoPanel, "\" alt=\"node info panel\" width=\"100%\" />\n            <ul>\n            <li>The info panel gives additional details about a particular node.</li>\n            <li>Some detail cells link to their respective domain page, denoted by an external link icon (<i class='fa fa-external-link' role='presentation'></i>). </li>\n            ").concat(help.infoPanel || '', "\n            </ul>\n            <h4>The Legend</h4>\n            <img src=\"").concat(images.legend, "\" alt=\"provenance legengd\" width=\"100%\" />\n            <ul>\n              <li>Legend items are filterable, clicking on a legend item toggles the entity's color map highlight.</li>\n              <li>The eye icon (<i class='fa fa-eye' role='presentation'></i>) after legend labels toggles the visibility of the respective item on the graph.</li>\n              ").concat(help.legend || '', "\n            </ul>\n        </div>");
  const [html] = (0, _react.useState)(help.html || _html);
  return {
    html
  };
};
var _default = exports.default = useHelpHtml;