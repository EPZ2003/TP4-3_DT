import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { REGISTRY_PORT } from "../config";

export type Node = { nodeId: number; pubKey: string };

export type RegisterNodeBody = {
  nodeId: number;
  pubKey: string;
};

export type GetNodeRegistryBody = {
  nodes: Node[];
};

export async function launchRegistry() {
  const NodesRegistered:GetNodeRegistryBody={
    nodes:[]
  }
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());

  // TODO implement the status route
  // _registry.get("/status", (req, res) => {});
  _registry.get("/status", (req, res) => {
    res.send("live")
  });
  _registry.get("/getPrivateKey", (req, res) => {
    res.send({result:req.body.privateKey})
  });
  _registry.post("/registerNode", (req, res) => {
    const { nodeId,pubKey } = req.body;
    console.log(nodeId)
    const node:Node = {
      nodeId:nodeId,
      pubKey:pubKey
    }
    NodesRegistered.nodes.push(node)
    res.send(NodesRegistered)
  });
  _registry.get("/getPrivateKey", (req,res)=>{
    
  })

  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`registry is listening on port ${REGISTRY_PORT}`);
  });

  return server;
}
