class TestController {
  test = async(req, res) => {
    try {
      return res.json({ user: 'okok' });
    } catch (err) {
      console.log(err);
      return res.json({ error: err.message });
    } 
  }
}

module.exports = new TestController;