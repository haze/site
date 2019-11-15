<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  THREE.Cache.enabled = true;
  let viewport = null;
  let textMesh = null;
  let camera = null;
  let renderer = null;

  let spinSpeed = (Math.random() * (0.001 - 0.05) + 0.05).toFixed(3);
  let rotX = Math.random() >= 0.5;

  const resetViewport = () => {
    let domRect = viewport.getBoundingClientRect();
    const vw = domRect.width;
    const vh = domRect.height;
    renderer.setSize(vw, vh);
    camera.aspect = vw/vh;
    camera.updateProjectionMatrix();
  }

  const onResize = resetViewport;

  onMount(() => {
    const scene = new THREE.Scene();
    let domRect = viewport.getBoundingClientRect();
    let vw = domRect.width;
    let vh = domRect.height;
    if (vh == 0) { // special case -_-
      vw = (window.innerWidth / 10) * 6.5; // 65%
      vh = (window.innerHeight / 5); // 20%
    }
    camera = new THREE.PerspectiveCamera(45, vw/vh, 1, 1000);
    camera.position.z = 70;
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(vw, vh);
    /* resetViewport(); */
    viewport.appendChild( renderer.domElement );
    const material = new THREE.MeshNormalMaterial({ wireframe: true });
    new THREE.FontLoader().load('fonts/sf_pro.json', (font) => {
      const text = new THREE.TextGeometry( "HAZE", {
        font: font,
        size: 20,
        height: 4,
      });
      text.center();
      text.computeBoundingBox();
      text.computeVertexNormals();
      textMesh = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry(text), material )
      scene.add(textMesh);
    });
    var animate = function () {
      requestAnimationFrame( animate );
      if (textMesh != null) {
        if (rotX) {
          textMesh.rotation.y = (textMesh.rotation.y - spinSpeed) % 360;
        } else {
          textMesh.rotation.x = (textMesh.rotation.x - spinSpeed) % 360;
        }
      }
      renderer.render( scene, camera );
    };
    animate();
  });
  
</script>
<style>
  .viewport {
    width: 65%;
    height: 20%;
  }
</style>
<svelte:window on:resize={onResize}/>
<div class="viewport" bind:this={viewport}/>
