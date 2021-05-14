import "../styles/home.css"

import React from "react"

import * as THREE from 'three'
import debounce from 'lodash.debounce'

import { GLTFLoader } from './three-examples/loaders/GLTFLoader'
import { EffectComposer } from './three-examples/postprocessing/EffectComposer'
import { RenderPass } from './three-examples/postprocessing/RenderPass'
import { ShaderPass } from './three-examples/postprocessing/ShaderPass'
import { OrbitControls } from './three-examples/controls/OrbitControls'

import AdditiveShader from '../shaders/Additive'
import ASCIIShader from '../shaders/ASCII'
import RippleShader from '../shaders/Ripple'
import ScanShader from '../shaders/Scan'
import VertexLitParticle from '../shaders/VertexLitParticle'
import VolumetricLightScattering from '../shaders/VolumetricLightScattering'
import VolumetricLightCylinder from '../shaders/VolumetricLightCylinder'

const mousePositionNormalized = new THREE.Vector2(0.2, 0.2)

export default class ThreeGraphics extends React.Component {

  constructor() {
    super();
    this.clock = new THREE.Clock();
    this.lastRippleReset = 0;
  }

  componentDidMount() {

    // Constants

    this.DEFAULT_LAYER = 0
    this.OCCLUSION_LAYER = 1

    this.FONT_MAP_SIZE = new THREE.Vector2(64, 64)
    this.FONT_CHAR_SIZE = new THREE.Vector2(8, 8)

    this.rotationClockwise = true;

    // Create Scene + Camera

    this.mainScene = new THREE.Scene()

    this.mainCamera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      5,
      25
    )
    this.mainCamera.position.z = 10

    this.occlusionCamera = this.mainCamera.clone()
    this.occlusionCamera.layers.set(this.OCCLUSION_LAYER)

    // Add Point Lights
    //blue main
    this.backLight = new THREE.PointLight(0x00aaff, 50, 0)
    this.backLight.layers.enable(this.OCCLUSION_LAYER)
    this.backLight.position.set(-10, 0, 5)
    this.mainScene.add(this.backLight)

    //blue ambient
    this.fillLight = new THREE.PointLight(0x00aaff, 0.7, 10)
    this.fillLight.layers.enable(this.OCCLUSION_LAYER)
    this.fillLight.position.set(10, 0, 0)
    this.mainScene.add(this.fillLight)

    //pink main
    this.keyLight = new THREE.PointLight(0xff00ff, 50, 20)
    this.keyLight.layers.enable(this.OCCLUSION_LAYER)
    this.keyLight.position.set(10, 0, 5)
    this.mainScene.add(this.keyLight)

    // Create this.renderer

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth * 1, window.innerHeight * 1)
    this.mount.appendChild(this.renderer.domElement)

    // add orbit controls
    // this.controls = new OrbitControls(this.mainCamera, this.renderer.domElement);

    // circles around the model
    // var CircleGeometry1 = new THREE.RingGeometry(2.5, 0.02, 32, 32);
    // var CircleMaterial1 = new THREE.MeshBasicMaterial({ color: 0x333333 });
    // this.circle1 = new THREE.Mesh(CircleGeometry1, CircleMaterial1);
    // this.circle1.rotation.x = 0.1;
    // this.circle2 = new THREE.Mesh(CircleGeometry, CircleMaterial);
    // this.circle2.rotation.x = 1;
    // this.circle2.rotation.y = 0.5;
    // this.circle3 = new THREE.Mesh(CircleGeometry, CircleMaterial);
    // this.circle3.rotation.x = -1;
    // this.circle3.rotation.y = -2;
    // this.circle4 = new THREE.Mesh(CircleGeometry, CircleMaterial);
    // this.circle4.rotation.x = -2;
    // this.circle4.rotation.y = -1;
    // this.mainScene.add(this.circle1);
    // this.mainScene.add(this.circle2);
    // this.mainScene.add(this.circle3);
    // this.mainScene.add(this.circle4);


    // Load 3D Model

    this.loader = new GLTFLoader()
    this.modelFile = require('./devface.glb')

    this.modelContainer = new THREE.Group()
    this.modelContainer.layers.enable(this.OCCLUSION_LAYER)
    this.mainScene.add(this.modelContainer)

    this.loader.load(
      this.modelFile,
      gltf => {
        // Add default mesh
        gltf.scene.scale.set(0.2, 0.2, 0.2) // scale here
        this.modelContainer.position.set(0, -0.3, 0)
        this.modelContainer.add(gltf.scene)

        // Add black mesh set to occlusion Layer
        const occlusionScene = gltf.scene.clone()
        const blackMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x000000),
        })
        occlusionScene.traverse(node => {
          if (node.material) {
            node.material = blackMaterial
          }
          if (node.layers) {
            node.layers.set(this.OCCLUSION_LAYER)
          }
        })
        this.modelContainer.add(occlusionScene)
      },
      undefined,
      console.error
    )

    // Generic

    function getLowResSize() {
      const charCountPrecise = [
        // window.innerWidth * 1 / this.FONT_CHAR_SIZE.x,
        // window.innerHeight * 1 / this.FONT_CHAR_SIZE.y,
        window.innerWidth * 1 / 8,
        window.innerHeight * 1 / 8,
      ]

      const charCountCeil = charCountPrecise.map(Math.ceil)

      return {
        charCountPrecise,
        charCountCeil,
      }
    }

    this.startingSizeData = getLowResSize()

    this.lowResRenderTarget = new THREE.WebGLRenderTarget(
      this.startingSizeData.charCountCeil[0] * 2,
      this.startingSizeData.charCountCeil[1] * 2
    )

    const lowResDepthTexture = new THREE.DepthTexture()
    lowResDepthTexture.type = THREE.UnsignedShortType
    this.lowResRenderTarget.depthTexture = lowResDepthTexture

    this.lowResEffectRenderTarget = new THREE.WebGLRenderTarget(
      this.startingSizeData.charCountCeil[0] * 2,
      this.startingSizeData.charCountCeil[1] * 2
    )

    this.occlusionRenderTarget = new THREE.WebGLRenderTarget(
      this.startingSizeData.charCountCeil[0] * 2,
      this.startingSizeData.charCountCeil[1] * 2
    )

    // Ripple Effect

    const RIPPLE_SPEED = 0.2
    const RIPPLE_PEAK = 0.2

    const ripples = []
    const rippleCanvas = document.createElement('canvas')
    // const rippleCanvas = this.mount.appendChild('canvas')
    rippleCanvas.width = rippleCanvas.style.width = window.innerWidth * 1
    rippleCanvas.height = rippleCanvas.style.height = window.innerHeight * 1
    const rippleContext = rippleCanvas.getContext('2d')
    const rippleTexture = new THREE.Texture(rippleCanvas)
    rippleTexture.minFilter = THREE.NearestFilter
    rippleTexture.magFilter = THREE.NearestFilter

    let rippleWasRendering = false

    const linear = t => t
    const easeOutQuart = t => 1 - --t * t * t * t

    this.renderRipples = (delta) => {
      if (ripples.length) {
        rippleWasRendering = true

        rippleContext.fillStyle = 'rgb(128, 128, 0)'
        rippleContext.fillRect(0, 0, rippleCanvas.width, rippleCanvas.height)

        ripples.forEach((ripple, i) => {
          ripple.age += delta * RIPPLE_SPEED

          if (ripple.age > 1) {
            ripples.splice(i, 1)
            return
          }

          const size = rippleCanvas.height * easeOutQuart(ripple.age)

          const alpha =
            ripple.age < RIPPLE_PEAK
              ? easeOutQuart(ripple.age / RIPPLE_PEAK)
              : 1 - linear((ripple.age - RIPPLE_PEAK) / (1 - RIPPLE_PEAK))

          let grd = rippleContext.createRadialGradient(
            ripple.position.x,
            ripple.position.y,
            size * 0.25,
            ripple.position.x,
            ripple.position.y,
            size
          )

          grd.addColorStop(1, `rgba(128, 128, 0, 0.5)`)
          grd.addColorStop(
            0.8,
            `rgba(${ripple.color.x}, ${ripple.color.y}, ${16 * alpha}, ${alpha})`
          )
          grd.addColorStop(0, `rgba(0, 0, 0, 0)`)

          rippleContext.beginPath()
          rippleContext.fillStyle = grd
          rippleContext.arc(
            ripple.position.x,
            ripple.position.y,
            size,
            0,
            Math.PI * 2
          )
          rippleContext.fill()
        })

        rippleTexture.needsUpdate = true
      } else if (rippleWasRendering) {
        rippleContext.fillStyle = 'rgb(128, 128, 0)'
        rippleContext.fillRect(0, 0, rippleCanvas.width, rippleCanvas.height)

        rippleWasRendering = false
        rippleTexture.needsUpdate = true
      }
    }

    this.addAutoRipple = function addRippleDesktop(event) {
      ripples.push({
        age: 0,
        position: new THREE.Vector2(event.clientX, event.clientY),
        color: new THREE.Vector2(
          (event.clientX / window.innerWidth * 1) * 255,
          (event.clientY / window.innerHeight * 1) * 255
        ),
      })
    }

    function addRippleMobile(event) {
      var x = event.changedTouches[0].clientX
      var y = event.changedTouches[0].clientY

      ripples.push({
        age: 0,
        position: new THREE.Vector2(x, y),
        color: new THREE.Vector2(
          (x / window.innerWidth * 1) * 255,
          (y / window.innerHeight * 1) * 255
        ),
      })
    }

    window.addEventListener('click', this.addAutoRipple)
    window.addEventListener('touchend', addRippleMobile)

    // Particles

    const PARTICLE_COUNT = 90
    const PARTICLE_DEPTH = 5
    const PARTICLE_SPEED = 3

    let frustumHeight
    let frustumWidth
    let frustumHeightHalf
    let frustumWidthHalf

    const particlesGroup = new THREE.Group()
    this.mainScene.add(particlesGroup)

    function updateFrustumValues(mainCamera) {
      frustumHeight =
        2.0 *
        mainCamera.position.z *
        Math.tan(mainCamera.fov * 0.5 * THREE.Math.DEG2RAD)

      frustumWidth = frustumHeight * mainCamera.aspect

      frustumHeightHalf = frustumHeight / 2
      frustumWidthHalf = frustumWidth / 2

      particlesGroup.position.x = -frustumWidthHalf
      particlesGroup.position.y = frustumHeightHalf
    }
    updateFrustumValues(this.mainCamera)

    const particleGeometry = new THREE.BufferGeometry()
    let _particlePositions = []
    let _particleSpeeds = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = Math.random() * frustumWidth
      let y = -(Math.random() * frustumHeight)
      let z = (Math.random() * 2 - 1) * (PARTICLE_DEPTH / 2)
      _particlePositions.push(x, y, z)
      _particleSpeeds.push(1 + Math.random() * PARTICLE_SPEED)
    }

    const particleSpeeds = new Float32Array(_particleSpeeds)
    const particleStartPositions = new Float32Array(_particlePositions)
    const particlePositions = new THREE.Float32BufferAttribute(
      _particlePositions,
      3
    )
    particleGeometry.setAttribute('position', particlePositions)

    const particleMaterial = new THREE.ShaderMaterial(VertexLitParticle())
    particleMaterial.uniforms.pointSize.value = 2.0
    particleMaterial.uniforms.decayModifier.value = 2.5
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particlesGroup.add(particles)

    this.animateParticles = (delta) => {
      let i = 0
      for (let p = 0; p < PARTICLE_COUNT; p++) {
        particlePositions.array[i] =
          (particleStartPositions[i] * frustumWidthHalf +
            particleSpeeds[p] * (1.0 + mousePositionNormalized.x * 4.0) * 0.2) %
          frustumWidth

        particlePositions.array[i + 1] =
          (particleStartPositions[i + 1] * frustumHeightHalf +
            particleSpeeds[p] * (1.0 - mousePositionNormalized.y * 4.0) * 0.1) %
          frustumHeight

        i += 3
      }

      particlePositions.needsUpdate = true
    }

    // Volumetric Lighting

    const lightGeometry = new THREE.CylinderGeometry(4, 10, 15, 32, 6, true)
    lightGeometry.applyMatrix4(
      new THREE.Matrix4().makeTranslation(
        0,
        -lightGeometry.parameters.height / 2,
        0
      )
    )

    lightGeometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))

    this.lightCylinderMaterial = new THREE.ShaderMaterial(
      VolumetricLightCylinder()
    )
    this.lightConeTarget = new THREE.Vector3(0, 0, -8)
    this.lightCone = new THREE.Mesh(lightGeometry, this.lightCylinderMaterial)
    this.lightCone.position.set(-5, 5, -8)
    this.lightCone.layers.set(this.OCCLUSION_LAYER)
    this.lightCylinderMaterial.uniforms.spotPosition.value = this.lightCone.position
    this.mainScene.add(this.lightCone)

    // ASCII Effect

    const fontLoader = new THREE.TextureLoader()
    const fontFile = require('./font3.png')
    const tFont = fontLoader.load(fontFile)
    tFont.minFilter = THREE.NearestFilter
    tFont.magFilter = THREE.NearestFilter

    const asciiPass = new ShaderPass(ASCIIShader())
    asciiPass.needsSwap = false
    asciiPass.uniforms.tLowRes.value = this.lowResEffectRenderTarget.texture
    asciiPass.uniforms.tDepth.value = this.lowResRenderTarget.depthTexture
    asciiPass.uniforms.cameraNear.value = this.mainCamera.near
    asciiPass.uniforms.cameraFar.value = this.mainCamera.far * 0.35
    asciiPass.uniforms.tFont.value = tFont

    const fontCountX = this.FONT_MAP_SIZE.x / this.FONT_CHAR_SIZE.x
    const fontCountY = this.FONT_MAP_SIZE.y / this.FONT_CHAR_SIZE.y

    asciiPass.uniforms.fontCharTotalCount.value =
      Math.floor(fontCountX) * Math.floor(fontCountY)

    asciiPass.uniforms.fontCharSize.value.set(1 / fontCountX, 1 / fontCountY)

    asciiPass.uniforms.fontCharCount.value.set(fontCountX, fontCountY)

    // Occlusion Composer

    this.occlusionComposer = new EffectComposer(this.renderer, this.occlusionRenderTarget)
    this.occlusionComposer.renderToScreen = false

    this.occlusionComposer.addPass(new RenderPass(this.mainScene, this.occlusionCamera))

    this.lightScatteringPass = new ShaderPass(VolumetricLightScattering())
    this.lightScatteringPass.needsSwap = false
    this.occlusionComposer.addPass(this.lightScatteringPass)

    // Effect Composer

    this.effectComposer = new EffectComposer(this.renderer, this.lowResEffectRenderTarget)
    this.effectComposer.renderToScreen = false

    const additivePass = new ShaderPass(AdditiveShader())
    additivePass.textureID = null
    additivePass.uniforms.tDiffuse.value = this.lowResRenderTarget.texture
    additivePass.uniforms.tAdd.value = this.occlusionRenderTarget.texture
    this.effectComposer.addPass(additivePass)

    this.scanPass = new ShaderPass(ScanShader())
    this.scanPass.uniforms.tDepth.value = lowResDepthTexture
    this.scanPass.uniforms.cameraNear.value = this.mainCamera.near
    this.scanPass.uniforms.cameraFar.value = this.mainCamera.far
    this.effectComposer.addPass(this.scanPass)

    const ripplePass = new ShaderPass(RippleShader())
    ripplePass.uniforms.tRipple.value = rippleTexture
    ripplePass.needsSwap = false
    this.effectComposer.addPass(ripplePass)

    // Final Composer

    this.finalComposer = new EffectComposer(this.renderer)
    this.finalComposer.addPass(asciiPass)

    // Mouse Move

    this.mousemove = (e) => {
      this.lightCone.position.x = 10 * ((e.clientX / window.innerWidth * 1) * 2 - 1)
      this.backLight.position.x = this.lightCone.position.x
      mousePositionNormalized.set(
        e.clientX / window.innerWidth * 1,
        e.clientY / window.innerHeight * 1
      )
    }
    window.addEventListener('mousemove', this.mousemove)

    this.touchMove = (e) => {
      console.log(e.touches.length)
      if (e.touches.length < 2) {
        this.lightCone.position.x = 5 * ((e.changedTouches[0].clientX / window.innerWidth * 1) * 2 - 1)
        this.backLight.position.x = this.lightCone.position.x
        mousePositionNormalized.set(
          e.changedTouches[0].clientX / window.innerWidth * 1,
          e.changedTouches[0].clientY / window.innerHeight * 1
        )
      }
    }
    window.addEventListener("touchmove", this.touchMove);

    // Handle Window Resize

    this.updateAsciiRenderSize = () => {
      const size = getLowResSize()

      asciiPass.uniforms.renderCharSize.value.set(
        1 / size.charCountPrecise[0],
        1 / size.charCountPrecise[1]
      )

      asciiPass.uniforms.renderCharCount.value.set(
        size.charCountPrecise[0],
        size.charCountPrecise[1]
      )

      this.lowResRenderTarget.setSize(
        size.charCountCeil[0] * 2,
        size.charCountCeil[1] * 2
      )

      this.effectComposer.setSize(
        size.charCountCeil[0] * 2,
        size.charCountCeil[1] * 2
      )

      this.occlusionComposer.setSize(
        size.charCountCeil[0] * 2,
        size.charCountCeil[1] * 2
      )
    }

    // // //something to debug
    // var gridHelper = new THREE.GridHelper(200, 10);
    // this.mainScene.add(gridHelper);

    // var axesHelper = new THREE.AxesHelper(50, 50, 50 );
    // this.mainScene.add( axesHelper );

    // Render Scene

    this.modelContainer.rotation.y = -1.57;

    this.resizeRenderer = () => {
      rippleCanvas.width = rippleCanvas.style.width = window.innerWidth * 1
      rippleCanvas.height = rippleCanvas.style.height = window.innerHeight * 1
      this.updateAsciiRenderSize()
      this.renderer.setSize(window.innerWidth * 1, window.innerHeight * 1)
      this.mainCamera.aspect = window.innerWidth / window.innerHeight
      this.mainCamera.updateProjectionMatrix()
      this.occlusionCamera.aspect = this.mainCamera.aspect
      this.occlusionCamera.updateProjectionMatrix()
    }

    this.resizeRenderer()
    window.addEventListener('resize', debounce(this.resizeRenderer, 50))
    this.start()
  }

  renderScene = () => {

    const delta = this.clock.getDelta()

    const elapsed = this.clock.elapsedTime
    if (elapsed - this.lastRippleReset > (Math.random()*12 + 1.75)) {
      this.addAutoRipple({
        clientX: (Math.random() / 1.25 + 0.1) * window.innerWidth,
        clientY: (Math.random() / 1.25 + 0.1) * window.innerHeight
      })
      this.lastRippleReset = elapsed
    }

    // if (this.modelContainer.rotation.y < -2.09) {
    //   this.rotationClockwise = true;
    //   console.log("first")
    // }
    // else if (this.modelContainer.rotation.y > -1.05) {
    //   this.rotationClockwise = false;
    //   console.log("second")
    //   console.log(this.modelContainer.rotation.y)
    // }

    // if (this.rotationClockwise) {
    //   this.modelContainer.rotation.y += delta * 0.2;
    // }
    // else {
    //   this.modelContainer.rotation.y -= delta * 0.2;
    // }

    this.modelContainer.rotation.y = -2.09 + mousePositionNormalized.x
    this.modelContainer.rotation.z = - mousePositionNormalized.y / 6 + 0.2

    // // update rings
    // this.circle1.rotation.x += delta * 0.2;
    // this.circle2.rotation.x += delta * 0.2;
    // this.circle2.rotation.y += delta * 0.25;
    // this.circle3.rotation.x -= delta * 0.3;
    // this.circle3.rotation.y -= delta * 0.27;
    // this.circle4.rotation.x -= delta * 0.3;
    // this.circle4.rotation.y -= delta * 0.27;

    this.animateParticles(delta)

    // update orbitcontrols
    // this.controls.update();

    // Scan

    this.scanPass.uniforms.scan.value =
      (this.scanPass.uniforms.scan.value + delta * 0.5) % 2

    // // Volumetric Lighting

    this.lightCone.lookAt(this.lightConeTarget)
    this.lightCylinderMaterial.uniforms.spotPosition.value = this.lightCone.position
    const lightConePosition = this.lightCone.position.clone()
    const vector = lightConePosition.project(this.occlusionCamera)
    this.lightScatteringPass.uniforms.lightPosition.value.set(
      (vector.x + 1) / 2,
      (vector.y + 1) / 2
    )

    // Render

    this.renderRipples(delta)

    this.renderer.setRenderTarget(this.lowResRenderTarget)
    this.renderer.render(this.mainScene, this.mainCamera)

    this.renderer.setRenderTarget(this.occlusionRenderTarget)
    this.occlusionComposer.render()

    this.renderer.setRenderTarget(this.lowResEffectRenderTarget)
    this.effectComposer.render()

    this.renderer.setRenderTarget(null)
    this.finalComposer.render()

    this.frameId = window.requestAnimationFrame(this.renderScene);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.renderScene);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  render = () => {
    return (
      <div ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

