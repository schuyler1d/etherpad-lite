/**
 * 2011 Peter 'Pita' Martischka
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require("fs");

//default settings
exports.port = 9001;

//read the settings sync
var settingsStr = fs.readFileSync("../settings.json");

//try to parse the settings
var settings;
try
{
  settings = JSON.parse(settingsStr);
}
catch(e)
{
  console.error("There is a syntax error in your settings.json file");
  console.error("We recommend http://jsonlint.com/ to find the mistake");
  console.error(e.stack);
  process.exit(1);
}

//loop trough the settings
for(var i in settings)
{
  //test if the setting start with a low character
  if(i.charAt(0).search("[a-z]") !== 0)
  {
    console.error("WARNING: Settings should start with a low character: '" + i + "'");
  }

  //we know this setting, so we overwrite it
  if(exports[i])
  {
    exports[i] = settings[i];
  }
  //this setting is unkown, output a warning and throw it away
  else
  {
    console.error("WARNING: Unkown Setting: '" + i + "'");
    console.error("If this isn't a mistake, add the default settings for this value to node/settings.js");
  }
}
