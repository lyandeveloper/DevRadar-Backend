import axios from 'axios';
import Dev from '../models/Dev';
import parseStringAsArray from '../../utils/parseStringAsArray';
import { findConnections, sendMessage } from '../../websocket';

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filtrar as conexões que estão à no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    } else {
      return res.status(404).json({ error: 'The dev already exists' });
    }

    return res.json(dev);
  }

  async update(req, res) {
    const dev = await Dev.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });

    return res.json(dev);
  }

  async delete(req, res) {
    const dev = await Dev.findByIdAndRemove(req.params._id);

    res.send(dev);
  }
}

export default new DevController();
