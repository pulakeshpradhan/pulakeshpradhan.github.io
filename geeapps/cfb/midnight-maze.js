// 𝑀𝐼𝐷𝑁𝐼𝐺𝐻𝑇 𝑀𝐴𝑍𝐸 ☾☆
// -----------------
// cfb
// Application constants.
var TEXTURES_C6 = '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';
var TEXTURE_SIZE = 32;
var MAP_W = 20;
var MAP_H = 15;
var WALL_MAP = [
    2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 2, 0, 2, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 2, 8, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 2, 0, 2, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 2, 0, 2, 8, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 0, 2, 0, 2, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 2, 8, 0, 9, 0, 8, 0, 1, 0, 1, 0, 1, 0, 0, 0,
    2, 2, 2, 2, 0, 2, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 6, 6,
    4, 4, 4, 4, 0, 4, 8, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    4, 0, 0, 0, 0, 4, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 6, 6,
    4, 0, 4, 4, 4, 4, 8, 0, 9, 0, 8, 0, 1, 0, 1, 0, 1, 0, 0, 0,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    4, 0, 9, 9, 0, 4, 8, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    4, 0, 0, 0, 0, 4, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var FLOOR_MAP = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7, 7, 0, 3, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7, 7, 3, 3, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7, 7, 0, 3, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 7, 7, 0, 3, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 0, 3, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 3, 3, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 2, 0, 0, 9, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3, 9, 0,
    0, 2, 2, 2, 2, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 0, 0, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 3, 3, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 3, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 3, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var START_X = 1.5;
var START_Z = 1.5;
var FACING_DEG = 45;
var END_CELL_X = 18;
var END_CELL_Z = 8;
// Render constants.
var SCR_W = 180;
var SCR_H = 180;
var FOCAL_W = 0.2;
var FOCAL_H = 0.2;
var FOCAL_DEPTH = 0.2;
var WALL_HEIGHT = 0.75;
var CAMERA_Y = 0.25;
var START_MODE7_ROW = Math.round(SCR_H * 0.5) + 1;
var FOG_MIN_CAMERA_Z = 1.2;
var FOG_MAX_CAMERA_Z = 7.5;
var FOG_COLOR_V3 = [0.0, 0.14285714, 0.33333333];
var AMBIENT_REFLECT = 0.5;
var ENV_LIGHT_V3 = [-1.0 / 3.0, -2.0 / 3.0, 2.0 / 3.0];
var SKY_COLOR_V3 = FOG_COLOR_V3;
var STAR_COLOR_V3 = [0, 1.0, 1.0];
var STAR_PROB_DENOM = 201;
var STAR_RANGE_Y = 64;
// UI Constants.
var UI_BG_COLOR = 'rgb(0, 32, 64)';
var UI_TEXT_COLOR = 'rgb(0, 64, 128)';
// --------------------------------------------------------------------------------
// Crush6 format. 
// --------------------------------------------------------------------------------
var B64_LUT = [
    62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1,
    -1, -1, -1, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
var B64_START = 43;
var HEADER_LEN = 3;
function b64ToArray(base64String) {
  var array = [];
  for (var i = 0; i < base64String.length; i += 4) {
    var unpackChar = B64_LUT[base64String.charCodeAt(i) - B64_START];
    unpackChar = (unpackChar << 6) 
        | B64_LUT[base64String.charCodeAt(i + 1) - B64_START];
    unpackChar = (unpackChar << 6) 
        | B64_LUT[base64String.charCodeAt(i + 2) - B64_START];
    unpackChar = (unpackChar << 6) 
        | B64_LUT[base64String.charCodeAt(i + 3) - B64_START];
    array.push((unpackChar >> 16) & 0xff);
    array.push((unpackChar >> 8) & 0xff);
    array.push(unpackChar & 0xff);
  }
  return array;
}
// Decompress Crush6 formatted RGB data. 
function reform6(crush6_str) {
  var array = b64ToArray(crush6_str);
  // Read the header.
  var elementsN = array[1] * 256 + array[0];
  var indexN = array[2];
  // Read the dictionary.
  var index = {};
  for (var i = 0; i < indexN; i += 1) {
    var offset = HEADER_LEN + i * 3;
    index[i] = [array[offset], array[offset + 1], array[offset + 2]];
  }
  // Unpack 6bits -> 8bits.
  var sixStreamRle = [];
  for (var i = HEADER_LEN + indexN * 3; i < array.length; i += 3) {
    var packed = array[i] | array[i + 1] << 8 | array[i + 2] << 16;
    sixStreamRle.push(packed & 0x3f);
    sixStreamRle.push((packed >> 6) & 0x3f);
    sixStreamRle.push((packed >> 12) & 0x3f);
    sixStreamRle.push((packed >> 18) & 0x3f);
  }
  // Expand RLE.
  var sixStream = [];
  for (var i = 0; i < sixStreamRle.length; i += 1) {
    var x = sixStreamRle[i];
    if (x == 63) {
      var length = sixStreamRle[i + 1];
      var val = sixStreamRle[i + 2];
      for (var q = 0; q < length; q += 1) {
        sixStream.push(val);
      }
      i += 2;
      continue;
    }
    sixStream.push(x);
  }
  // Substitute triads for indices and convert to float.
  var triadStream = [];
  for (var i = 0; i < elementsN; i += 1) {
    var group = index[sixStream[i]];
    for (var q = 0; q < 3; q += 1) {
      triadStream.push(group[q] / 255.0);
    }
  }
  return triadStream;
}
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// Math utils.
// --------------------------------------------------------------------------------
function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}
function degToRad(t) {
  return t * (Math.PI / 180);
}
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// Array / raster utils.
// --------------------------------------------------------------------------------
function newZeroArray(length) {
  var arr = [];
  for (var i = 0; i < length; ++i) {
    arr.push(0);
  }
  return arr;
}
function zeroArray(array) {
  for (var i = 0; i < array.length; ++i) {
    array[i] = 0;
  }
}
function fillArrayV3(xV3, start, end, array) {
  for (var i = start; i < end; i += 3) {
    offset = i * 3;
    array[offset] = xV3[0];
    array[offset + 1] = xV3[1];
    array[offset + 2] = xV3[2];
  }
}
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// Rendering
// --------------------------------------------------------------------------------
function renderMode7(
    facingVx, facingVz,           // Normalized facing vector.
    pX, pY, pZ,                   // Camera origin.
    focalDepth, fovW, fovH,       // Camera plane.
    scrW, scrH,                   // Render texture width and height.
    startRow,                     // Texture row at which to start rendering.
    mapW, mapH, map,              // Floor map.
    textureAtlas, textureSize,    // Floor textures.
    fogMinZ, fogMaxZ, fogColorV3, // Fog.
    ambient,                      // Ambient light.
    envLightV3,                   // Parallel enviornmental light rays.
    output) {                     // Render texture.
  // Get the vector perpendicular to our facing direction.
  var pFacingVx = facingVz;
  var pFacingVz = -facingVx;
  var illumCoeff = Math.min(Math.max(-envLightV3[1], 0) + ambient, 1.0);
  var texStride = textureAtlas.length / 3 / textureSize;
  // The factor we'll use when calculating the linear fog / distance scale.
  var fogD = 1.0 / (fogMaxZ - fogMinZ);
  for (var yS = startRow; yS < scrH; yS += 1) {
    // Note these constants in camera space can be pre-computed. If we were
    // running this on period-appropriate hardware, we would do that (though
    // I guess interpreted JavaScript ain't much better).
    // This is the distance along camera space Z the current ray intersecting
    // the focal plane hits the the ground plane.
    var focalElev = ((yS / scrH) - 0.5) * fovH;
    var zD = pY / focalElev * focalDepth;
    // Along the line traced across the ground plane, calculate the distance
    // covered by one pixel.
    var stepX = zD / focalDepth;
    var leftXd = (fovW / 2.0) * stepX;
    var screenStepX = leftXd * 2.0 / scrW;
    // Fog doesn't enter the camera, so we calculate the Z distance from the
    // focal plane.
    var fogZd = clamp(zD - focalDepth, fogMinZ, fogMaxZ);
    // Fog pre-alpha multiplier.
    var fogAlpha = (fogZd - fogMinZ) * fogD;
    // The world X,Z coordinates to trace across the screen.
    var x = pX + facingVx * zD - pFacingVx * leftXd;
    var z = pZ + facingVz * zD - pFacingVz * leftXd;
    // How far we step the world X,Z trace.
    var vX = pFacingVx * screenStepX;
    var vZ = pFacingVz * screenStepX;
    // Trace the horizontal floor.
    for (var xS = 0; xS < scrW; xS += 1, x += vX, z += vZ) {
      var cellX = Math.floor(x);
      var cellZ = Math.floor(z);
      if ((cellX < 0) || (cellZ < 0) || (cellX >= mapW) || (cellZ >= mapH)) {
        continue;
      }
      var cell = map[cellZ * mapW + cellX];
      if (cell === 0) continue;
      // Get the array offset into the texture atlas for this pixel.
      var u = Math.floor(x * textureSize) % textureSize;
      var v = Math.floor(z * textureSize) % textureSize;
      var texOffset = ((v * texStride) + (u + (cell - 1) * textureSize)) * 3;
      // Composite the texel, fog, and illumination coefficient. 
      var fragR = textureAtlas[texOffset] * illumCoeff;
      fragR = (fogColorV3[0] - fragR) * fogAlpha + fragR;
      var fragG = textureAtlas[texOffset + 1] * illumCoeff;
      fragG = (fogColorV3[1] - fragG) * fogAlpha + fragG;
      var fragB = textureAtlas[texOffset + 2] * illumCoeff;
      fragB = (fogColorV3[2] - fragB) * fogAlpha + fragB;
      // Could also be an increment since the scan is row-major...
      var outOffset = (yS * scrW + xS) * 3;
      output[outOffset] = fragR;
      output[outOffset + 1] = fragG;
      output[outOffset + 2] = fragB;
    }
  }
}
function renderRaycast(
    facingVx, facingVz,           // Normalized facing vector.
    pX, pY, pZ,                   // Camera origin.
    focalDepth, fovW, fovH,       // Camera plane.
    scrW, scrH,                   // Render texture width and height.
    mapW, mapH, map,              // Wall map.
    textureAtlas, textureSize,    // Wall textures.
    wallHeight,                   // Wall height.
    fogMinZ, fogMaxZ, fogColorV3, // Fog.
    ambient,                      // Ambient light.
    envLightV3,                   // Parallel enviornmental light rays.
    output) {                     // Render texture.
  // Get the vector perpendicular to our facing direction.
  var pFacingVx = facingVz;
  var pFacingVz = -facingVx;
  // The world focal plane left edge.
  var xF = pX + facingVx * focalDepth - pFacingVx * fovW * 0.5;
  var zF = pZ + facingVz * focalDepth - pFacingVz * fovW * 0.5;
  // World space horizontal step across the focal plane of one pixel.
  var vX = pFacingVx * fovW / scrW;
  var vZ = pFacingVz * fovW / scrW;
  // EZ pre-compute these because we have exactly 4 surface normals.
  var wallIllumCoeffs = [
      Math.min(Math.max(-envLightV3[2], 0) + ambient, 1.0),
      Math.min(Math.max(-envLightV3[0], 0) + ambient, 1.0),
      Math.min(Math.max(envLightV3[2], 0) + ambient, 1.0),
      Math.min(Math.max(envLightV3[0], 0) + ambient, 1.0)];
  var texStride = textureAtlas.length / 3 / textureSize;
  // The factor we'll use when calculating the linear fog / distance scale.
  var fogD = 1.0 / (fogMaxZ - fogMinZ);
  for (var xS = 0; xS < scrW; xS += 1, xF += vX, zF += vZ) {
    // Get the normalized vector in the direction of the camera to the vertical
    // focal plane slice we're going to render.
    var vXRayD = xF - pX;
    var vZRayD = zF - pZ;
    var rayM = Math.sqrt(vXRayD * vXRayD + vZRayD * vZRayD);
    var vXRay = vXRayD / rayM;
    var vZRay = vZRayD / rayM;
    // Set up the raycast: We use rayGrid* to demarcate the next potential wall
    // wintersection, and ray* to track the current position of the ray segment.
    //
    // cellAdj* corrects for the fact that we treat cell positions as the left/
    // top-most transect we can intersect. 
    //
    // It's totally fine to do this discrete style (take steps along the ray,
    // find cell intersection and return) if you like chonky walls. It's
    // certainly faster and easier.
    var rayX = xF;
    var rayGridX = Math.floor(rayX);
    var cellAdjX = -1;
    if (vXRay > 0) {
      rayGridX += 1;
      cellAdjX = 0;
    }
    var rayZ = zF;
    var rayGridZ = Math.floor(rayZ);
    var cellAdjZ = -1;
    if (vZRay > 0) {
      rayGridZ += 1;
      cellAdjZ = 0;    
    }
    var intersect = false;
    var cell = 0;
    var texU = 0;
    var nextXi = 0;
    var nextZi = 0;
    var d = 0;
    for(;;) {
      // Find out whether its the X or Z transect that the ray intersects next
      // by computing the distance to that transect.
      nextXi = vXRay !== 0 ? (rayGridX - rayX) / vXRay : 1e12;
      nextZi = vZRay !== 0 ? (rayGridZ - rayZ) / vZRay : 1e12;
      // If we hit the X transect first...
      if (nextXi < nextZi) {
        if ((rayGridX <= 0) || (rayGridX >= mapW)) break;
        // Advance X and Z to the transect, and check if a wall is there.
        rayZ += nextXi * vZRay;
        rayX = rayGridX;
        cell = map[Math.floor(rayZ) * mapW + rayGridX + cellAdjX];
        if (cell > 0) {
          intersect = true;
          texU = Math.abs(rayZ - Math.floor(rayZ));
          // Note this omits lens correction to keep floor/wall allignment 
          // simple.
          d = (rayGridX - pX) / vXRay;          
          break;
        }
        rayGridX += vXRay > 0 ? 1.0 : -1.0;
      // If we hit the Z transect first...
      } else {
        if ((rayGridZ <= 0) || (rayGridZ >= mapH)) break;
        rayX += nextZi * vXRay;
        rayZ = rayGridZ;
        cell = map[(rayGridZ + cellAdjZ) * mapW + Math.floor(rayX)];
        if (cell > 0) {
          intersect = true;
          texU = Math.abs(rayX - Math.floor(rayX));
          d = (rayGridZ - pZ) / vZRay;
          break;
        }
        rayGridZ += vZRay > 0 ? 1.0 : -1.0;
      }
    }
    if (intersect) {
      var fogZd = clamp(d, fogMinZ, fogMaxZ);
      // Fog pre-alpha multiplier.
      var fogAlpha = (fogZd - fogMinZ) * fogD;
      // The wall direction effects how the light responds to parallel rays.
      var illumCoeff = 0;
      if (nextZi < nextXi) {
        illumCoeff = vZRay > 0 ? wallIllumCoeffs[0] : wallIllumCoeffs[2];
      } else {
        illumCoeff = vXRay > 0 ? wallIllumCoeffs[1] : wallIllumCoeffs[3];
      }
      // Lots of constants we could be pre-calculate here, but whatever, the slow
      // part is the cast then wall trace.
      //
      // Get the wall top and bottom coordinates in focal_plane space.
      var segFovMin = rayM * -pY / d + fovH * 0.5;
      var segFovMax = rayM * (wallHeight - pY) / d + fovH * 0.5;
      var segD = segFovMax - segFovMin;      
      var segFovMinClipped = clamp(segFovMin, 0, fovH);
      var segFovMaxClipped = clamp(segFovMax, 0, fovH);
      // Don't draw walls that would be drawn outside the focal_plane.
      if (segFovMinClipped == segFovMaxClipped) break;
      // Figure out the screen start and end y, and the texture v start and 
      // end.
      var texV = (segFovMax - segFovMaxClipped) / segD;
      var texVEnd = (segFovMax - segFovMinClipped) / segD;
      var yStart = scrH - 1 - Math.floor((segFovMaxClipped / fovH) * (scrH - 1));
      var yEnd = scrH - 1 - Math.floor((segFovMinClipped / fovH) * (scrH - 1));      
      var texStep = (texVEnd - texV) / (yEnd - yStart);
      // Trace the vertical wall.
      cell -= 1;
      for (var yS = yStart; yS <= yEnd; yS += 1) {
        var u = Math.floor(texU * (textureSize - 1));
        var v = Math.floor(texV * (textureSize - 1));
        var texOffset = ((v * texStride) + (u + cell * textureSize)) * 3;
         // Composite the texel etc... 
        var fragR = textureAtlas[texOffset] * illumCoeff;
        fragR = (fogColorV3[0] - fragR) * fogAlpha + fragR;
        var fragG = textureAtlas[texOffset + 1] * illumCoeff;
        fragG = (fogColorV3[1] - fragG) * fogAlpha + fragG;
        var fragB = textureAtlas[texOffset + 2] * illumCoeff;
        fragB = (fogColorV3[2] - fragB) * fogAlpha + fragB;
        // Could also be an stride-sized increment since the scan is row-major...
        var outOffset = (yS * scrW + xS) * 3;
        output[outOffset] = fragR;
        output[outOffset + 1] = fragG;
        output[outOffset + 2] = fragB;
        texV += texStep;
      }
    }
  }
}
function skybox(
    facingVx, facingVz, // Normalized facing vector.
    height,             // Height down the screen to draw the sky
    mask,               // Valid drawn region mask.
    starColorV3,        // Star color.
    starProbDenom,      // 1 in N chance of drawing a star. 
    scrW,               // Render texture width.
    output) {           // Render texture.
  // Seed the rng uniquely by where we're facing.
  var pRng = Math.round(Math.atan2(facingVz, facingVx) * (180 / Math.PI)) + 180;
  for (var y = 0, offset = 0, maskOffset = 0; y < height; y += 1) {
    for (var x = 0; x < scrW; x += 1, offset += 3, maskOffset += 1) {
      // Step the LCG.
      pRng = (75 * pRng + 74) % 65537;
      if ((mask[maskOffset] != 1.0) || ((pRng % starProbDenom) !== 0)) continue;
      output[offset] = starColorV3[0];
      output[offset + 1] = starColorV3[1];
      output[offset + 2] = starColorV3[2];
    }
  } 
}
function paintBackdropAndMask(
    scrW, scrH,      // Render texture width and height.
    backgroundColV3, // Background color.
    maskOutput,      // Mask render texture.
    output) {        // Render texture.
  for (var y = 0, offset = 0, maskOffset = 0; y < scrH; y += 1) {
    for (var x = 0; x < scrW; x += 1, offset += 3, maskOffset += 1) {
      if ((output[offset] === 0) && (output[offset + 1] === 0) 
          && (output[offset + 2] === 0)) {
        output[offset] = backgroundColV3[0];
        output[offset + 1] = backgroundColV3[1];
        output[offset + 2] = backgroundColV3[2];
        maskOutput[maskOffset] = 1;
      } else {
        maskOutput[maskOffset] = 0;
      }
    }
  }
}
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// Display driver.
// --------------------------------------------------------------------------------
function createRasterDisplayPanel(scrW, srcH) {
  // So... yeah... we're gonna add labels to the screen in a 2D grid and modulate
  // the background color.
  var pixelIndex = [];
  var panel = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {stretch: 'both'}});
  for (var y = 0; y < srcH; y += 1) {
    var pixelRow = [];
    for (var x = 0; x < scrW; x += 1) {
      var pixel = ui.Label({
          style: {
            backgroundColor: '#000000',
            margin: '0 0 0 0',
            stretch: 'both'}});
      pixelIndex.push(pixel);
      pixelRow.push(pixel);
    }
    panel.add(ui.Panel({
        widgets: pixelRow,
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {stretch: 'both'}}));
  }
  return [panel, pixelIndex];
}
function flipToDisplay(scrW, scrH, surface, display) {
  for (var y = 0, offset = 0, displayOffset = 0; y < scrH; y += 1) {
    for (var x = 0; x < scrW; x += 1, offset += 3, displayOffset += 1) {  
      var rgbString = 
          'rgb(' + Math.floor(surface[offset] * 255) 
          + ', ' + Math.floor(surface[offset + 1] * 255)
          + ', ' + Math.floor(surface[offset + 2] * 255) + ')';
      display[displayOffset].style().set('backgroundColor', rgbString);
    }
  }
}
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// Main.
// --------------------------------------------------------------------------------
function stretchyPanel(stretch) {
  return ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {stretch: stretch, backgroundColor: UI_BG_COLOR}});
}
function enter(gameSetup) {
  var screenPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {stretch: 'both', backgroundColor: UI_BG_COLOR}});
  screenPanel.add(stretchyPanel('both'));
  var midPanel = stretchyPanel('horizontal');
  midPanel.add(stretchyPanel('both'));
  var button = ui.Button({
      label: '🌙',
      style: {stretch: 'vertical', color: UI_TEXT_COLOR}});
  button.onClick(function(widget) { 
      button.setLabel("𝐼'𝑙𝑙 𝑛𝑒𝑒𝑑 𝑠𝑜𝑚𝑒 𝑡𝑖𝑚𝑒 𝑡𝑜 𝑓𝑖𝑛𝑑 𝑡ℎ𝑒 𝑒𝑛𝑡𝑟𝑎𝑛𝑐𝑒. 𝐶𝑙𝑖𝑐𝑘 𝑚𝑒 𝑤ℎ𝑒𝑛 𝑦𝑜𝑢'𝑟𝑒 𝑟𝑒𝑎𝑑𝑦.");
      button.onClick(function(widget) {
          gameSetup();
      });
  });
  midPanel.add(button);
  midPanel.add(stretchyPanel('both'));
  screenPanel.add(midPanel);
  screenPanel.add(stretchyPanel('both'));
  ui.root.widgets().reset([screenPanel]);
}
function navPanel(upCallback, rightCallback, downCallback, leftCallback) {
  var leftPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {backgroundColor: UI_BG_COLOR}});
  var centerPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {backgroundColor: UI_BG_COLOR}});
  var rightPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {backgroundColor: UI_BG_COLOR}});
  var up = ui.Button({
      label: '⇧', 
      style: {color: UI_TEXT_COLOR}, 
      onClick: upCallback});
  var down = ui.Button({
      label: '⇩', 
      style: {color: UI_TEXT_COLOR}, 
      onClick: downCallback});
  var left = ui.Button({
      label: '⇦',
      style: {
          color: UI_TEXT_COLOR,
          padding: '20px 0px 0px 0px',
          backgroundColor: UI_BG_COLOR},
      onClick: leftCallback});
  var right = ui.Button({
      label: '⇨',
      style: {
          color: UI_TEXT_COLOR,
          padding: '20px 0px 0px 0px',
          backgroundColor: UI_BG_COLOR},
      onClick: rightCallback});
  var mainPanelLayout = stretchyPanel('both');
  var mainPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {backgroundColor: UI_BG_COLOR}});
  mainPanel
      .add(leftPanel.add(left))
      .add(centerPanel.add(up).add(down))
      .add(rightPanel.add(right));
  mainPanelLayout.add(stretchyPanel('both'));
  mainPanelLayout.add(mainPanel);
  mainPanelLayout.add(stretchyPanel('both'));
  var layoutPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {stretch: 'vertical', width: '25%', 
              backgroundColor: UI_BG_COLOR}});
  layoutPanel.add(stretchyPanel('both'));
  layoutPanel.add(mainPanelLayout);
  return layoutPanel;
}
function wawa() {
  // The perfect place for a midnight snack.
  var map = ui.Map({lon: -75.459518, lat: 39.901692, zoom: 15});
  map.setOptions('HYBRID');
  ui.root.widgets().reset([map]);
}
function gameBuilder() {
  var atlas = reform6(TEXTURES_C6);
  var output = newZeroArray(SCR_H * SCR_W * 3);
  var mask = newZeroArray(SCR_H * SCR_W);
  var playerV2 = [START_X, START_Z];
  var playerFacingAngle = FACING_DEG;
  function advance(xDir, zDir) {
    // Return true if we take the update, false otherwise.
    var cellX = Math.floor(playerV2[0]);
    var cellZ = Math.floor(playerV2[1]);
    var nextCellX = cellX + xDir;
    var nextCellZ = cellZ + zDir;
    if ((nextCellX < 0) || (nextCellX >= MAP_W)) return false;
    if ((nextCellZ < 0) || (nextCellZ >= MAP_H)) return false;
    // For 4-connected movement, we just check the destination cell.
    if ((xDir === 0) || (zDir === 0)) {
      if ((FLOOR_MAP[nextCellZ * MAP_W + nextCellX] === 0)
          || (WALL_MAP[nextCellZ * MAP_W + nextCellX] !== 0)) {
        return false;
      }
    // For 8-connected movement, we check all cells in the path to the destination
    // cell.
    } else {
      if ((FLOOR_MAP[nextCellZ * MAP_W + nextCellX] === 0)
          || (FLOOR_MAP[cellZ * MAP_W + nextCellX] === 0)
          || (FLOOR_MAP[nextCellZ * MAP_W + cellX] === 0)
          || (WALL_MAP[nextCellZ * MAP_W + nextCellX] !== 0)
          || (WALL_MAP[cellZ * MAP_W + nextCellX] !== 0)
          || (WALL_MAP[nextCellZ * MAP_W + cellX] !== 0)) {
        return false;
      }
    }
    playerV2[0] += xDir;
    playerV2[1] += zDir;
    return true;
  }
  var displayReturn = createRasterDisplayPanel(SCR_W, SCR_H);
  var displayPanel = displayReturn[0];
  var display = displayReturn[1];
  function drawFrame() {
    var rads = degToRad(playerFacingAngle);
    var facingVx = Math.cos(rads);
    var facingVz = Math.sin(rads);
    // This is quite slow and minimally optimized. By my count rendering a
    // frame and flipping it to the display takes ~4.5s.
    //
    // Finding a better raster display method than 32k labels and
    // dropping visual effects / running different loops at different fog
    // depths / pre-multiplying light constants could net the biggest gains.
    zeroArray(output);
    renderMode7(facingVx, facingVz, playerV2[0], CAMERA_Y, playerV2[1], 
                FOCAL_DEPTH, FOCAL_W, FOCAL_H, SCR_W, SCR_H, START_MODE7_ROW,
                MAP_W, MAP_H, FLOOR_MAP, atlas, TEXTURE_SIZE, FOG_MIN_CAMERA_Z,
                FOG_MAX_CAMERA_Z, FOG_COLOR_V3, AMBIENT_REFLECT, ENV_LIGHT_V3, 
                output);
    renderRaycast(facingVx, facingVz, playerV2[0], CAMERA_Y, playerV2[1],
                  FOCAL_DEPTH, FOCAL_W, FOCAL_H, SCR_W, SCR_H, MAP_W, MAP_H,
                  WALL_MAP, atlas, TEXTURE_SIZE, WALL_HEIGHT, FOG_MIN_CAMERA_Z, 
                  FOG_MAX_CAMERA_Z, FOG_COLOR_V3, AMBIENT_REFLECT, ENV_LIGHT_V3, 
                  output);
    paintBackdropAndMask(SCR_W, SCR_H, SKY_COLOR_V3, mask, output);
    skybox(facingVx, facingVz, STAR_RANGE_Y, mask, STAR_COLOR_V3, 
           STAR_PROB_DENOM, SCR_W, output);
    flipToDisplay(SCR_W, SCR_H, output, display);
  }
  var screenPanel = stretchyPanel('both');
  screenPanel.add(displayPanel);
  screenPanel.add(navPanel(
      function() { 
        var rads = degToRad(playerFacingAngle);
        // Only draw the frame if we moved.
        if (advance(Math.round(Math.cos(rads)), Math.round(Math.sin(rads)))) {
          drawFrame();
        }
        if ((Math.floor(playerV2[0]) == END_CELL_X) 
            && (Math.floor(playerV2[1]) == END_CELL_Z)) wawa();
      }, 
      function() { 
        playerFacingAngle = (playerFacingAngle + 315) % 360; 
        drawFrame();
      }, 
      function() { 
        var rads = degToRad(playerFacingAngle + 180);
        // Only draw the frame if we moved.
        if (advance(Math.round(Math.cos(rads)), Math.round(Math.sin(rads)))) {
          drawFrame();
        }
        if ((Math.floor(playerV2[0]) == END_CELL_X) 
            && (Math.floor(playerV2[1]) == END_CELL_Z)) wawa();
      }, 
      function() { 
        playerFacingAngle = (playerFacingAngle + 45) % 360; 
        drawFrame();
      }));
  ui.root.widgets().reset([screenPanel]);
  drawFrame();
}
enter(gameBuilder);